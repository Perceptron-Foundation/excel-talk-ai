from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from langchain_chroma import Chroma
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_google_genai import ChatGoogleGenerativeAI, HarmBlockThreshold, HarmCategory
from langchain_community.document_loaders import UnstructuredExcelLoader, CSVLoader
from langchain_google_genai import GoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter 

import os
from dotenv import load_dotenv
import tempfile
import uuid

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

os.environ["ANONYMIZED_TELEMETRY"] = "False"
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=api_key
)

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-pro",
    safety_settings={
        HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
    },
    google_api_key=api_key,
    temperature=0.3,
)

db = {}


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Excel Chat AI Backend is running"}
    
@app.post("/upload_file")
async def upload_file(file: UploadFile = File(...)):
    temp_file_path = None
    try:
        # Validate file extension
        file_extension = os.path.splitext(file.filename)[1].lower()
        allowed_extensions = ['.xlsx', '.xls', '.csv']
        
        if file_extension not in allowed_extensions:
            return JSONResponse(
                content={"error": f"Only {', '.join(allowed_extensions)} files are supported"}, 
                status_code=400
            )
        
        contents = await file.read()
        if len(contents) > 10 * 1024 * 1024:
            return JSONResponse(
                content={"error": "File size exceeds 10MB limit"}, 
                status_code=413
            )
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            temp_file.write(contents)
            temp_file_path = temp_file.name
            temp_file.flush()
        
        # Choose appropriate loader based on file type
        if file_extension == '.csv':
            loader = CSVLoader(file_path=temp_file_path)
        else:  # .xlsx or .xls
            loader = UnstructuredExcelLoader(temp_file_path)
        
        document = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        docs = text_splitter.split_documents(document)

        chroma_db = Chroma.from_documents(docs, embedding=embeddings)
        room_id = str(uuid.uuid4())
        db[room_id] = chroma_db 
        
        return {"message": f"{file_extension.upper()} file uploaded and processed", "room_id": room_id}
        
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    finally:
        # Cleanup temporary file
        if temp_file_path and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)

class QueryInput(BaseModel):
    room_id: str
    query: str

@app.post("/query")
async def query_excel(query_input: QueryInput):
    room_id = query_input.room_id
    query = query_input.query
    
    if room_id not in db:
        return JSONResponse(status_code=404, content={"message": "Room not found"})
    
    chroma_db = db[room_id]
    retriever = chroma_db.as_retriever()

    prompt = ChatPromptTemplate.from_template("""
    You are an expert data assistant. Your task is to answer the user's question using ONLY the context data from the provided spreadsheet below – do NOT make assumptions or invent data.

    Context Description:
    - The context contains information about commodities, suppliers, quantities, and spend, extracted from a spreadsheet.

    Instructions:
    - Always present your responses in a structured, easy-to-read format suitable for a chat app, such as:
    - Markdown bullet points for lists
    - Tables for comparisons or grouped summaries
    - Proper headings for different sections if multiple topics are requested
    - Clearly show all calculations, comparisons, or summaries (if needed). Briefly explain the reasoning.
    - If the response is numeric or tabular, include a short summary/interpretation at the top.
    - If the user's question cannot be answered from the context, reply: **"The requested information is not available in the provided data."**
    - Never include data outside the spreadsheet context.

    <context>
    {context}
    </context>

    Question:
    {input}
    """)

    
    doc_chain = create_stuff_documents_chain(llm, prompt)
    retrieval_chain = create_retrieval_chain(retriever, doc_chain)

    response = retrieval_chain.invoke({"input": query})
    
    return {"answer": response["answer"]}

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
