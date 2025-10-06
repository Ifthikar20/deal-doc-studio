import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Users, Sparkles, ArrowRight, Check } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">ProposalHub</span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/dashboard")}
                className="rounded-full"
              >
                Sign in
              </Button>
              <Button 
                onClick={() => navigate("/dashboard")}
                className="rounded-full px-6"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 sm:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto mb-20 animate-fade-in">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
              Say hello to{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                ProposalHub
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Proposals that impress. Templates that save time. Clients that convert.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/dashboard")} 
              className="text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Try for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Comparison Cards */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Before Card */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20 rounded-[2.5rem] transform translate-y-2 blur-xl opacity-50" />
              <div className="relative bg-card border border-border/50 rounded-[2.5rem] p-10 sm:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <div className="text-center mb-12">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Traditional Way
                  </p>
                  <h3 className="text-3xl font-bold">Manual Process</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                    <div className="h-12 w-12 rounded-full bg-muted flex-shrink-0" />
                    <p className="text-muted-foreground pt-2">Hours spent formatting documents</p>
                  </div>
                  
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
                    <div className="h-12 w-12 rounded-full bg-muted flex-shrink-0" />
                    <p className="text-muted-foreground pt-2">Copy-pasting client information</p>
                  </div>
                  
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 animate-slide-in-right" style={{ animationDelay: "0.5s" }}>
                    <div className="h-12 w-12 rounded-full bg-muted flex-shrink-0" />
                    <p className="text-muted-foreground pt-2">Manual calculations and pricing</p>
                  </div>
                  
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 animate-slide-in-right" style={{ animationDelay: "0.6s" }}>
                    <div className="h-12 w-12 rounded-full bg-muted flex-shrink-0" />
                    <p className="text-muted-foreground pt-2">Lost proposals and follow-ups</p>
                  </div>
                </div>
              </div>
            </div>

            {/* After Card */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 rounded-[2.5rem] transform translate-y-2 blur-2xl" />
              <div className="relative bg-gradient-to-br from-card to-card/95 border border-primary/20 rounded-[2.5rem] p-10 sm:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <div className="text-center mb-12">
                  <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">
                    ProposalHub
                  </p>
                  <h3 className="text-3xl font-bold">Smart Automation</h3>
                </div>
                
                <div className="flex items-center justify-center mb-12 animate-scale-in" style={{ animationDelay: "0.5s" }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-full blur-3xl opacity-60 animate-pulse" />
                    <div className="relative h-48 w-48 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-2xl">
                      <Sparkles className="h-24 w-24 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-semibold mb-8 leading-relaxed">
                    "Everything you need,<br />automated and beautiful"
                  </p>
                  
                  <div className="space-y-3 text-left max-w-sm mx-auto">
                    <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Create in minutes, not hours</span>
                    </div>
                    <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Auto-populated client data</span>
                    </div>
                    <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.8s" }}>
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Smart pricing calculations</span>
                    </div>
                    <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Track everything in one place</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6">
              Built for professionals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to create winning proposals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Smart Templates</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start with beautiful templates or import your own PDFs. Customize everything.
                </p>
              </div>
            </div>

            <div className="group relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Client Hub</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Organize clients, track proposals, and never miss a follow-up.
                </p>
              </div>
            </div>

            <div className="group relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500" />
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-xl">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Auto-Calculate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dynamic pricing with sections, items, and automatic totals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-5xl mx-auto animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-[3rem] blur-3xl" />
            <div className="relative bg-gradient-to-br from-card to-card/90 border border-primary/20 rounded-[3rem] p-16 sm:p-20 text-center shadow-2xl">
              <h2 className="text-5xl sm:text-6xl font-bold mb-6">
                Ready to win more?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join professionals creating stunning proposals in minutes
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate("/dashboard")} 
                className="text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">ProposalHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 ProposalHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
