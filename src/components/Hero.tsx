import { ArrowRight } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";

interface HeroProps {
  onScrollToUpload: () => void;
}

const Hero = ({ onScrollToUpload }: HeroProps) => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Transform Your{" "}
                <span className="text-primary">Excel Sheets</span> into a{" "}
                <span className="text-success">Smart AI Chatbot</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Upload your commodity data Excel file, ask natural-language questions, 
                and get instant business insights. Powered by AI, designed for productivity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onScrollToUpload}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] hover:shadow-[0_12px_32px_-8px_hsl(var(--primary)/0.7)] hover:scale-105 transition-all duration-300 font-semibold h-12 px-8 rounded-lg text-base"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 border border-border bg-card text-card-foreground hover:bg-card/80 transition-colors h-12 px-8 rounded-lg text-base font-medium"
              >
                Learn More
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">10x</p>
                <p className="text-sm text-muted-foreground">Faster Analysis</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Secure & Private</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">AI</p>
                <p className="text-sm text-muted-foreground">Powered Insights</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.3)]">
              <img
                src={heroIllustration}
                alt="Excel to AI Chat Transformation"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
