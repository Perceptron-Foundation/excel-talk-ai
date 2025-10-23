import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-gold flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-gold fill-gold" /> by{" "}
            <span className="font-semibold text-gold">Rishabh Mittal</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
