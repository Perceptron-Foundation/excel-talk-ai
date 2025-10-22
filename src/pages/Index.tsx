import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FileUpload from "@/components/FileUpload";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const handleFileUploaded = (file: File) => {
    setUploadedFile(file);
  };

  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <Hero>
          {!uploadedFile ? (
            <FileUpload onFileUploaded={handleFileUploaded} />
          ) : null}
        </Hero>
        
        <div ref={uploadSectionRef}>
          {uploadedFile && (
            <ChatInterface fileName={uploadedFile.name} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
