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
        <Hero onScrollToUpload={scrollToUpload} />
        
        <div ref={uploadSectionRef}>
          {!uploadedFile ? (
            <FileUpload onFileUploaded={handleFileUploaded} />
          ) : (
            <ChatInterface fileName={uploadedFile.name} />
          )}
        </div>

        <section id="about" className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Why ExcelChat Pro?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-card rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-semibold text-lg text-card-foreground mb-2">
                    Lightning Fast
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Get instant answers to complex data questions in seconds, not hours
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h4 className="font-semibold text-lg text-card-foreground mb-2">
                    Secure & Private
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your data stays private and secure with enterprise-grade encryption
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h4 className="font-semibold text-lg text-card-foreground mb-2">
                    AI-Powered
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI understands context and provides actionable insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
