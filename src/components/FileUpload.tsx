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
    <section id="upload" className="py-16 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-card rounded-2xl p-8 sm:p-12 shadow-[0_4px_20px_-2px_hsl(210_30%_10%/0.1)]">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-card-foreground mb-3">
              Upload Your Excel File
            </h3>
            <p className="text-muted-foreground">
              Drag and drop your .xlsx file or click to browse
            </p>
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-xl p-12 transition-all ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-primary/50"
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
                  <FileSpreadsheet className="h-8 w-8 text-success" />
                  <div>
                    <p className="font-medium text-secondary-foreground">
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
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <p className="text-lg font-medium text-card-foreground mb-1">
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
                variant="hero"
                size="lg"
                className="w-full"
              >
                Upload & Start Chatting
                <FileSpreadsheet className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FileUpload;
