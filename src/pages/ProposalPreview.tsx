import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, DollarSign, Clock, MapPin, User, Phone, Mail, Users, ClipboardList, ShieldAlert, Wrench, Image, Video, BarChart3, GitCompare, HelpCircle, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useProposal } from "@/contexts/ProposalContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ProposalPreview() {
  const navigate = useNavigate();
  const { proposalData, cards } = useProposal();
  const [question, setQuestion] = useState("");

  const calculateItemTotal = (item: any) => {
    const subtotal = item.quantity * item.rate;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSectionTotal = (section: any) => {
    return section.items.reduce((sum: number, item: any) => sum + calculateItemTotal(item), 0);
  };

  const calculateGrandTotal = () => {
    return cards
      .filter((card) => card.type === "pricing")
      .reduce((total, card) => {
        return (
          total +
          card.data.reduce((sectionTotal: number, section: any) => {
            return (
              sectionTotal +
              section.items.reduce((itemTotal: number, item: any) => {
                const subtotal = item.quantity * item.rate;
                const discountAmount = subtotal * (item.discount / 100);
                return itemTotal + (subtotal - discountAmount);
              }, 0)
            );
          }, 0)
        );
      }, 0);
  };

  const calculateTotalDiscount = () => {
    return cards
      .filter((card) => card.type === "pricing")
      .reduce((total, card) => {
        return (
          total +
          card.data.reduce((sectionTotal: number, section: any) => {
            return (
              sectionTotal +
              section.items.reduce((itemSum: number, item: any) => {
                return itemSum + (item.quantity * item.rate * item.discount) / 100;
              }, 0)
            );
          }, 0)
        );
      }, 0);
  };

  const calculateDuration = () => {
    const timelineCards = cards.filter((card) => card.type === "timeline");
    if (timelineCards.length === 0) return 0;
    
    return timelineCards.reduce((total, card) => {
      return (
        total +
        card.data.reduce((phaseTotal: number, phase: any) => {
          const weeks = parseInt(phase.duration.split(" ")[0]) || 0;
          return phaseTotal + weeks;
        }, 0)
      );
    }, 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const renderCard = (card: typeof cards[number]) => {
    switch (card.type) {
      case "text":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">{card.data.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{card.data.content}</p>
            </CardContent>
          </Card>
        );

      case "timeline":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Project Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {card.data.map((phase, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:border-l-0 last:pb-0">
                    <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-primary border-4 border-background" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{phase.phase}</h4>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{phase.tasks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "pricing":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Investment Breakdown</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {card.data.map((section) => (
                  <div key={section.id} className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground border-b border-border/50 pb-2">{section.title}</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left py-3 px-2 text-sm font-semibold text-muted-foreground">Description</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Qty</th>
                            <th className="text-center py-3 px-2 text-sm font-semibold text-muted-foreground">Duration</th>
                            <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Rate</th>
                            <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Discount</th>
                            <th className="text-right py-3 px-2 text-sm font-semibold text-muted-foreground">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.items.map((item, idx) => (
                            <tr key={idx} className="border-b border-border/30">
                              <td className="py-4 px-2">
                                <div className="space-y-1">
                                  <p className="font-medium">{item.description}</p>
                                  {item.notes.length > 0 && (
                                    <ul className="text-xs text-muted-foreground space-y-0.5 ml-4">
                                      {item.notes.map((note, noteIdx) => (
                                        <li key={noteIdx} className="list-disc">{note}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </td>
                              <td className="py-4 px-2 text-center">{item.quantity}</td>
                              <td className="py-4 px-2 text-center text-sm text-muted-foreground">{item.duration}</td>
                              <td className="py-4 px-2 text-right">${item.rate.toLocaleString()}</td>
                              <td className="py-4 px-2 text-right text-destructive">
                                {item.discount > 0 ? `-${item.discount}%` : "-"}
                              </td>
                              <td className="py-4 px-2 text-right font-semibold">${calculateItemTotal(item).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-primary/20">
                            <td colSpan={5} className="py-4 px-2 text-right font-semibold">Section Total:</td>
                            <td className="py-4 px-2 text-right font-bold text-primary text-lg">
                              ${calculateSectionTotal(section).toLocaleString()}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "image":
        if (!card.data.url) return null;
        return (
          <Card key={card.id} className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <img src={card.data.url} alt={card.data.alt} className="w-full h-auto" />
              {card.data.caption && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground text-center">{card.data.caption}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "video":
        if (!card.data.url) return null;
        const getEmbedUrl = (url: string, type: string) => {
          if (type === "youtube") {
            const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
          }
          if (type === "vimeo") {
            const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
            return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
          }
          return url;
        };
        return (
          <Card key={card.id} className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <iframe src={getEmbedUrl(card.data.url, card.data.type)} className="w-full h-full" allowFullScreen />
              </div>
              {card.data.caption && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground text-center">{card.data.caption}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case "team":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Team & Expertise</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {card.data.map((member, index) => (
                  <Card key={index} className="border-border/30">
                    <CardContent className="pt-6 space-y-3">
                      {member.image && (
                        <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto" />
                      )}
                      <div className="text-center">
                        <h4 className="font-semibold text-lg">{member.name}</h4>
                        <p className="text-sm text-primary">{member.role}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "implementation":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Implementation Plan</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {card.data.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{step.title}</h4>
                        <span className="text-sm text-muted-foreground">{step.duration}</span>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "risk":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Risk Mitigation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {card.data.map((risk, index) => (
                  <Card key={index} className="border-border/30">
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-semibold text-lg">{risk.risk}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          risk.impact === "high" ? "bg-destructive/20 text-destructive" :
                          risk.impact === "medium" ? "bg-yellow-500/20 text-yellow-600" :
                          "bg-green-500/20 text-green-600"
                        }`}>
                          {risk.impact.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Mitigation Strategy:</p>
                        <p className="text-sm text-foreground">{risk.mitigation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "support":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Support & Maintenance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {card.data.map((item, index) => (
                  <Card key={index} className="border-border/30">
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-primary">{item.cost}</p>
                          <p className="text-xs text-muted-foreground">{item.duration}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "infographic":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">{card.data.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {card.data.items.map((item, index) => (
                  <div key={index} className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <p className="text-3xl font-bold text-primary mb-2">{item.value}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case "beforeafter":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">{card.data.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/30 bg-muted/30">
                  <CardContent className="pt-6 space-y-3">
                    <h4 className="font-semibold text-lg text-muted-foreground">{card.data.beforeTitle}</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{card.data.beforeDescription}</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardContent className="pt-6 space-y-3">
                    <h4 className="font-semibold text-lg text-primary">{card.data.afterTitle}</h4>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{card.data.afterDescription}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        );

      case "faq":
        return (
          <Card key={card.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">{card.data.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {card.data.items.map((item, index) => (
                  <div key={index} className="space-y-2 pb-4 border-b border-border/30 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-lg">{item.question}</h4>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto p-8 space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Editor
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">Request Changes</Button>
            <Button>Accept Proposal</Button>
          </div>
        </div>

        {/* Cover Page */}
        <Card className="border-border/50 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <CardContent className="p-12 space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Proposal</p>
              <h1 className="text-4xl font-bold text-foreground">{proposalData.title}</h1>
              <p className="text-lg text-muted-foreground">{proposalData.description}</p>
            </div>
            <Separator className="bg-primary/20" />
            <div className="grid grid-cols-2 gap-6 text-left max-w-md mx-auto">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Prepared For</p>
                <p className="font-semibold">{proposalData.client}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Job Number</p>
                <p className="font-semibold">{proposalData.jobNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Prepared By</p>
                <p className="font-semibold">{proposalData.preparedBy}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Version</p>
                <p className="font-semibold">{proposalData.version}</p>
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
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{proposalData.client}</p>
                    <p className="text-sm text-muted-foreground">{proposalData.clientAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Event Location</p>
                    <p className="font-medium">{proposalData.eventLocation}</p>
                    <p className="text-sm text-muted-foreground">{proposalData.eventAddress}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {proposalData.contactName && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p className="font-medium">{proposalData.contactName}</p>
                    </div>
                  </div>
                )}
                {proposalData.contactPhone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{proposalData.contactPhone}</p>
                    </div>
                  </div>
                )}
                {proposalData.contactEmail && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{proposalData.contactEmail}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <p className="text-2xl font-bold text-foreground">${calculateGrandTotal().toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Timeline</p>
                  <p className="text-2xl font-bold text-foreground">{calculateDuration()} weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="text-lg font-bold text-foreground">{formatDate(proposalData.eventStartDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Cards */}
        {cards.map((card) => renderCard(card))}

        {/* Terms and Conditions */}
        {proposalData.termsAndConditions && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{proposalData.termsAndConditions}</p>
            </CardContent>
          </Card>
        )}

            {/* Call to Action */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-8 text-center space-y-4">
                <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  We're excited to work with you on this project. Please review the proposal and let us know if you have any questions.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button size="lg" variant="outline">
                    Request Changes
                  </Button>
                  <Button size="lg">Accept Proposal</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question/Request Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 sticky top-8">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <CardTitle>Questions or Requests?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Have a question about this proposal or need clarification on any section? Let us know!
                </p>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="question">Your Question or Request</Label>
                    <Textarea
                      id="question"
                      placeholder="e.g., Can you provide more details about the timeline for Phase 2?"
                      rows={6}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={() => {
                    if (question.trim()) {
                      // Handle submission
                      setQuestion("");
                    }
                  }}>
                    Send Question
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Request Price Adjustment
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Request Timeline Change
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Schedule a Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
