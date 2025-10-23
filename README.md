# Data Insight Pro

## About

Data Insight Pro is an interactive platform that lets users upload their CSV data and instantly query, analyze, or summarize it through an intuitive chat interface. Powered by state-of-the-art Large Language Models (LLMs), Data Insight Pro helps you turn spreadsheets into actionable insights, conversationally.
- AI-powered natural language chat based on uploaded tabular data
- Minimal UI for file upload, chat, and session management
- Fast, lightweight, and supports .xlsx, .xls, .csv
- **Project GitHub**: [GitHub](https://github.com/therishabhmittal-05/excel-talk-ai)

***

## Architecture

**Frontend**  
- Vite + React + TypeScript  
- UI: shadcn-ui, Tailwind CSS 

**Backend**  
- FastAPI (Python)
- REST endpoints (`/upload_file`, `/query`)
- Handles file uploads, context extraction, and chat request routing
- Integrates with LLMs for spreadsheet-aware responses

**How it works:**  
1. User uploads a CSV file.
2. Backend parses, generate embeddings using gemini-embedding model and stores in chroma DB. 
3. LLM receives prompt and context (room_id for chroma DB session- storing embeddings for the current file), answers chat queries.
4. Response is sent to the frontend and shown as a Markdown chat reply.

***

## Screenshots

### Hero Section
![Hero Section](https://res.cloudinary.com/dzbbxzmsk/image/upload/v1761219072/Screenshot_2025-10-23_165844_lpsaww.png)
### File Upload 
![Upload Interface](https://res.cloudinary.com/dzbbxzmsk/image/upload/v1761219135/Screenshot_2025-10-23_170204_fnvy8y.png)
### Chat Interface
![Chat Interface](https://res.cloudinary.com/dzbbxzmsk/image/upload/v1761219253/Screenshot_2025-10-23_170405_afrhqi.png)

### 1. Clone the Repository

```sh
git clone https://github.com/therishabhmittal-05/excel-talk-ai.git
cd excel-talk-ai
```

### 2. Frontend Setup

```sh
npm i
npm run dev
```

### 3. Backend Setup

```sh
cd backend_ai_feature
python -m venv venv
source venv/bin/activate 
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```


***

## About & GitHub

Built and maintained by Rishabh Mittal  
- GitHub: [GitHub](https://github.com/therishabhmittal-05/excel-talk-ai/)  
- Project Demo: [Excel Talk AI](https://excel-talk-ai.vercel.app)


