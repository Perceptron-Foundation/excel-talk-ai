import { Upload, FileSpreadsheet, X } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onFileUploaded: (file: File) => void;
}

const FileUpload = ({ onFileUploaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an Excel file (.xlsx or .xls)");
      return false;
    }
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 10MB");
      return false;
    }
    
    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      toast.success(`File "${file.name}" selected successfully`);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUploaded(selectedFile);
      toast.success("Starting chat with your data...");
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl p-8 shadow-[0_8px_32px_-8px_hsl(0_0%_0%/0.2)] border border-gold/20">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`border-2 border-dashed rounded-xl p-12 transition-all ${
            isDragging
              ? "border-gold bg-gold/10 scale-[1.02]"
              : "border-gold/40 hover:border-gold"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />

          {selectedFile ? (
            <div className="flex items-center justify-between bg-secondary rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-gold" />
                <div>
                  <p className="font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-destructive" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-gold" />
              </div>
              <p className="text-lg font-medium text-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-muted-foreground">
                Excel files only (.xlsx, .xls) • Max 10MB
              </p>
            </label>
          )}
        </div>

        {selectedFile && (
          <div className="mt-6">
            <Button
              onClick={handleUpload}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.6)] hover:shadow-[0_12px_32px_-8px_hsl(var(--accent)/0.7)] transition-all font-bold h-12 text-base"
              size="lg"
            >
              Upload & Start Chatting
              <FileSpreadsheet className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
