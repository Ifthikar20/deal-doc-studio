import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, DollarSign, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// This would come from the editor in a real app - using mock data for now
const proposalData = {
  title: "Website Redesign",
  client: "Acme Corp",
  description: "Complete website redesign with modern UI/UX",
  date: "October 6, 2025",
  sections: [
    { id: "1", title: "Project Overview", content: "This section describes the overall project scope and objectives. We will work closely with your team to understand your business needs and create a modern, user-friendly website that drives results." },
    { id: "2", title: "Deliverables", content: "• Fully responsive website design\n• Custom UI/UX components\n• Mobile-optimized layouts\n• Cross-browser compatibility\n• Performance optimization\n• SEO-ready structure" },
  ],
  timeline: [
    { phase: "Discovery & Planning", duration: "2 weeks", tasks: "Requirements gathering, research, competitor analysis, and project planning" },
    { phase: "Design", duration: "3 weeks", tasks: "Wireframes, mockups, prototypes, and design revisions" },
    { phase: "Development", duration: "6 weeks", tasks: "Frontend and backend implementation, testing, and quality assurance" },
  ],
  priceBreakdown: [
    { description: "UI/UX Design", quantity: 1, rate: 15000 },
    { description: "Frontend Development", quantity: 1, rate: 20000 },
    { description: "Backend Development", quantity: 1, rate: 15000 },
  ],
  termsAndConditions: `1. Payment Terms: 50% upfront, 50% upon completion.

2. Project timeline is subject to client feedback and approval times.

3. Additional revisions beyond the agreed scope will be charged separately at $150/hour.

4. All intellectual property rights transfer upon final payment.

5. Either party may terminate with 30 days written notice.

6. Client is responsible for providing all necessary content, assets, and access.

7. Hosting and domain costs are separate and not included in this proposal.

8. Support and maintenance can be arranged separately after project completion.`,
};

export default function ProposalPreview() {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return proposalData.priceBreakdown.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
  };

  const calculateDuration = () => {
    return proposalData.timeline.reduce((total, phase) => {
      const weeks = parseInt(phase.duration.split(" ")[0]) || 0;
      return total + weeks;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto p-8 space-y-8 animate-fade-in">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">Preview Mode</p>
            <h1 className="text-2xl font-semibold text-foreground">Client View</h1>
          </div>
        </div>

        {/* Proposal Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold text-foreground">{proposalData.title}</h1>
          <p className="text-xl text-muted-foreground">Prepared for {proposalData.client}</p>
          <p className="text-sm text-muted-foreground">{proposalData.date}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <p className="text-xl font-bold text-primary">${calculateTotal().toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="text-xl font-bold text-foreground">{calculateDuration()} Weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="text-xl font-bold text-foreground">TBD</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Introduction */}
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <p className="text-lg text-foreground leading-relaxed">{proposalData.description}</p>
          </CardContent>
        </Card>

        {/* Custom Sections */}
        {proposalData.sections.map((section) => (
          <Card key={section.id} className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-line leading-relaxed">{section.content}</p>
            </CardContent>
          </Card>
        ))}

        {/* Timeline */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Project Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {proposalData.timeline.map((phase, index) => (
              <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-0 last:pb-0">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{phase.phase}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{phase.tasks}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Investment Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {proposalData.priceBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × ${item.rate.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    ${(item.quantity * item.rate).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between py-4 bg-primary/5 px-6 rounded-lg">
              <p className="text-xl font-bold text-foreground">Total Investment</p>
              <p className="text-2xl font-bold text-primary">${calculateTotal().toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Terms & Conditions */}
        <Card className="border-border/50 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground whitespace-pre-line leading-relaxed">
                {proposalData.termsAndConditions}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 space-y-4">
          <Separator className="mb-6" />
          <p className="text-muted-foreground">
            Thank you for considering our proposal. We look forward to working with you.
          </p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" className="gap-2">
              Accept Proposal
            </Button>
            <Button variant="outline" size="lg">
              Request Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
