import { FileSpreadsheet, Table, TrendingUp, BarChart3, PieChart, Calculator } from "lucide-react";

interface HeroProps {
  children: React.ReactNode;
}

const Hero = ({ children }: HeroProps) => {
  return (
    <section className="relative pt-24 pb-24 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Floating Excel Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FileSpreadsheet className="absolute top-20 left-10 w-16 h-16 text-gold/20 animate-pulse" style={{ animationDelay: '0s' }} />
        <Table className="absolute top-40 right-20 w-20 h-20 text-accent/20 animate-pulse" style={{ animationDelay: '1s' }} />
        <TrendingUp className="absolute bottom-40 left-20 w-14 h-14 text-gold/20 animate-pulse" style={{ animationDelay: '2s' }} />
        <BarChart3 className="absolute top-60 right-40 w-16 h-16 text-accent/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <PieChart className="absolute bottom-20 right-10 w-18 h-18 text-gold/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <Calculator className="absolute top-1/2 left-1/4 w-12 h-12 text-accent/20 animate-pulse" style={{ animationDelay: '2.5s' }} />
        
        {/* Subtle text overlays */}
        <div className="absolute top-32 right-1/4 text-gold/10 text-6xl font-bold rotate-12">XLSX</div>
        <div className="absolute bottom-32 left-1/3 text-accent/10 text-5xl font-bold -rotate-6">DATA</div>
        <div className="absolute top-1/2 right-1/3 text-gold/10 text-4xl font-bold rotate-6">AI</div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-primary-foreground">
              Transform Data into<br />
              <span className="text-gold">AI-Powered Conversations</span>
            </h1>

            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Upload your commodity data file and chat with your business data instantly. AI-driven answers. No more manual searches.
            </p>
          </div>

          {/* Upload box centered in hero */}
          <div className="pt-8">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
