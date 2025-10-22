import { MessageSquare } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="ExcelChat" className="h-10 w-10" />
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">ExcelChat Pro</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
