import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, DollarSign, Clock, MapPin, User, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PriceItem {
  description: string;
  quantity: number;
  rate: number;
  duration: string;
  discount: number;
  notes: string[];
}

interface PricingSection {
  id: string;
  title: string;
  items: PriceItem[];
}

interface TimelinePhase {
  phase: string;
  duration: string;
  tasks: string;
}

interface ProposalSection {
  id: string;
  title: string;
  content: string;
}

// This would come from the editor in a real app - using mock data for now
const proposalData = {
  title: "Website Redesign",
  client: "Acme Corp",
  clientAddress: "123 Main St, Suite 100, City, State 12345",
  description: "Complete website redesign with modern UI/UX",
  date: "October 6, 2025",
  jobNumber: "302798",
  preparedBy: "John Smith",
  version: "1.0",
  eventLocation: "Client Office",
  eventAddress: "123 Event Venue, City, State 12345",
  eventStartDate: "2025-11-16",
  eventEndDate: "2025-11-18",
  contactName: "Jane Doe",
  contactPhone: "(555) 123-4567",
  contactEmail: "jane@acme.com",
  sections: [
    { id: "1", title: "Project Overview", content: "This section describes the overall project scope and objectives. We will work closely with your team to understand your business needs and create a modern, user-friendly website that drives results." },
    { id: "2", title: "Deliverables", content: "• Fully responsive website design\n• Custom UI/UX components\n• Mobile-optimized layouts\n• Cross-browser compatibility\n• Performance optimization\n• SEO-ready structure" },
  ] as ProposalSection[],
  timeline: [
    { phase: "Discovery & Planning", duration: "2 weeks", tasks: "Requirements gathering, research, competitor analysis, and project planning" },
    { phase: "Design", duration: "3 weeks", tasks: "Wireframes, mockups, prototypes, and design revisions" },
    { phase: "Development", duration: "6 weeks", tasks: "Frontend and backend implementation, testing, and quality assurance" },
  ] as TimelinePhase[],
  pricingSections: [
    {
      id: "1",
      title: "Main Deliverables",
      items: [
        { 
          description: "UI/UX Design", 
          quantity: 1, 
          rate: 15000, 
          duration: "2 weeks", 
          discount: 10,
          notes: ["Includes wireframes and prototypes", "Up to 3 revision rounds"] 
        },
        { 
          description: "Frontend Development", 
          quantity: 1, 
          rate: 20000, 
          duration: "3 weeks", 
          discount: 0,
          notes: ["React-based implementation", "Responsive design"] 
        },
        { 
          description: "Backend Development", 
          quantity: 1, 
          rate: 15000, 
          duration: "3 weeks", 
          discount: 5,
          notes: ["API development", "Database setup"] 
        },
      ],
    },
  ] as PricingSection[],
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

  const calculateItemTotal = (item: PriceItem) => {
    const subtotal = item.quantity * item.rate;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSectionTotal = (section: PricingSection) => {
    return section.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateGrandTotal = () => {
    return proposalData.pricingSections.reduce((sum, section) => sum + calculateSectionTotal(section), 0);
  };

  const calculateTotalDiscount = () => {
    return proposalData.pricingSections.reduce((sum, section) => {
      return sum + section.items.reduce((itemSum, item) => {
        return itemSum + (item.quantity * item.rate * item.discount / 100);
      }, 0);
    }, 0);
  };

  const calculateDuration = () => {
    return proposalData.timeline.reduce((total, phase) => {
      const weeks = parseInt(phase.duration.split(" ")[0]) || 0;
      return total + weeks;
    }, 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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

        {/* Cover Page */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <h1 className="text-5xl font-bold text-foreground mb-4">{proposalData.title}</h1>
            <p className="text-2xl text-muted-foreground">Prepared for {proposalData.client}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-sm">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Job Number</p>
                <p className="font-semibold text-foreground">{proposalData.jobNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Version</p>
                <p className="font-semibold text-foreground">{proposalData.version}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Prepared By</p>
                <p className="font-semibold text-foreground">{proposalData.preparedBy}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                <p className="font-semibold text-foreground">{proposalData.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Information */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Client</p>
                  <p className="text-foreground">{proposalData.client}</p>
                  <p className="text-sm text-muted-foreground">{proposalData.clientAddress}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Event Location</p>
                  <p className="text-foreground">{proposalData.eventLocation}</p>
                  <p className="text-sm text-muted-foreground">{proposalData.eventAddress}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Event Dates</p>
                  <p className="text-foreground">
                    {formatDate(proposalData.eventStartDate)} - {formatDate(proposalData.eventEndDate)}
                  </p>
                </div>

                {proposalData.contactName && (
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Contact</p>
                    <p className="text-foreground">{proposalData.contactName}</p>
                    {proposalData.contactPhone && (
                      <p className="text-sm text-muted-foreground">{proposalData.contactPhone}</p>
                    )}
                    {proposalData.contactEmail && (
                      <p className="text-sm text-muted-foreground">{proposalData.contactEmail}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <p className="text-xl font-bold text-primary">${calculateGrandTotal().toLocaleString()}</p>
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
                  <p className="text-xl font-bold text-foreground">{formatDate(proposalData.eventStartDate)}</p>
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
        {proposalData.timeline.length > 0 && (
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
        )}

        {/* Pricing Breakdown */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Investment Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {proposalData.pricingSections.map((section) => (
              <div key={section.id} className="space-y-4">
                <h3 className="text-xl font-bold text-foreground border-b pb-2">{section.title}</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Qty</th>
                        <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Description</th>
                        <th className="text-left py-3 px-2 font-semibold text-muted-foreground">Duration</th>
                        <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Price</th>
                        <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Discount</th>
                        <th className="text-right py-3 px-2 font-semibold text-muted-foreground">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-2 align-top">{item.quantity}</td>
                          <td className="py-3 px-2 align-top">
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{item.description}</p>
                              {item.notes.length > 0 && (
                                <div className="space-y-0.5">
                                  {item.notes.map((note, noteIndex) => (
                                    <p key={noteIndex} className="text-xs text-muted-foreground italic">
                                      *Note: {note}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-2 align-top">{item.duration}</td>
                          <td className="py-3 px-2 align-top text-right">${item.rate.toLocaleString()}</td>
                          <td className="py-3 px-2 align-top text-right">
                            {item.discount > 0 ? (
                              <div>
                                <p className="text-destructive">{item.discount}%</p>
                                <p className="text-xs text-destructive">-${((item.quantity * item.rate * item.discount) / 100).toLocaleString()}</p>
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="py-3 px-2 align-top text-right font-semibold text-foreground">
                            ${calculateItemTotal(item).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-base font-semibold text-muted-foreground">Section Total:</p>
                  <p className="text-lg font-bold text-primary">${calculateSectionTotal(section).toLocaleString()}</p>
                </div>
              </div>
            ))}

            <Separator className="my-6" />
            
            {calculateTotalDiscount() > 0 && (
              <div className="flex justify-end items-center gap-4 px-4">
                <p className="text-base font-semibold text-muted-foreground">Total Savings:</p>
                <p className="text-lg font-bold text-destructive">-${calculateTotalDiscount().toLocaleString()}</p>
              </div>
            )}

            <div className="flex items-center justify-between py-6 px-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
              <p className="text-2xl font-bold text-foreground">Grand Total</p>
              <p className="text-3xl font-bold text-primary">${calculateGrandTotal().toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Terms & Conditions */}
        <Card className="border-2 border-primary/20">
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
