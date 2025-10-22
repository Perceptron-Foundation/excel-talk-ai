import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> by{" "}
            <span className="font-semibold text-foreground">Rishabh Mittal</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Python, LangChain & React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
