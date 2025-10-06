import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Send, Calendar, DollarSign, FileText, AlertCircle, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Card imports
import TimelineCard, { TimelinePhase } from "@/components/cards/TimelineCard";
import PricingCard, { PricingSection } from "@/components/cards/PricingCard";
import ImageCard, { ImageCardData } from "@/components/cards/ImageCard";
import VideoCard, { VideoCardData } from "@/components/cards/VideoCard";
import TeamExpertiseCard, { TeamMember } from "@/components/cards/TeamExpertiseCard";
import ImplementationPlanCard, { ImplementationStep } from "@/components/cards/ImplementationPlanCard";
import RiskMitigationCard, { Risk } from "@/components/cards/RiskMitigationCard";
import SupportMaintenanceCard, { SupportItem } from "@/components/cards/SupportMaintenanceCard";
import TextSectionCard, { TextSectionData } from "@/components/cards/TextSectionCard";

type ProposalCard =
  | { id: string; type: "timeline"; data: TimelinePhase[] }
  | { id: string; type: "pricing"; data: PricingSection[] }
  | { id: string; type: "image"; data: ImageCardData }
  | { id: string; type: "video"; data: VideoCardData }
  | { id: string; type: "team"; data: TeamMember[] }
  | { id: string; type: "implementation"; data: ImplementationStep[] }
  | { id: string; type: "risk"; data: Risk[] }
  | { id: string; type: "support"; data: SupportItem[] }
  | { id: string; type: "text"; data: TextSectionData };

export default function ProposalEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [proposalData, setProposalData] = useState({
    title: "Website Redesign",
    client: "Acme Corp",
    clientAddress: "123 Main St, Suite 100, City, State 12345",
    description: "Complete website redesign with modern UI/UX",
    jobNumber: "302798",
    preparedBy: "Your Name",
    version: "1.0",
    eventLocation: "Client Office",
    eventAddress: "123 Event Venue, City, State 12345",
    eventStartDate: "",
    eventEndDate: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    termsAndConditions: "1. Payment Terms: 50% upfront, 50% upon completion.\n2. Project timeline is subject to client feedback and approval times.\n3. Additional revisions beyond the agreed scope will be charged separately.\n4. All intellectual property rights transfer upon final payment.\n5. Either party may terminate with 30 days written notice.",
  });

  const [cards, setCards] = useState<ProposalCard[]>([
    {
      id: "1",
      type: "text",
      data: { title: "Project Overview", content: "This section describes the overall project scope and objectives." },
    },
    {
      id: "2",
      type: "timeline",
      data: [
        { phase: "Discovery & Planning", duration: "2 weeks", tasks: "Requirements gathering, research" },
        { phase: "Design", duration: "3 weeks", tasks: "Wireframes, mockups, prototypes" },
        { phase: "Development", duration: "6 weeks", tasks: "Frontend and backend implementation" },
      ],
    },
    {
      id: "3",
      type: "pricing",
      data: [
        {
          id: "1",
          title: "Main Deliverables",
          items: [
            { description: "UI/UX Design", quantity: 1, rate: 15000, duration: "2 weeks", discount: 0, notes: [] },
            { description: "Frontend Development", quantity: 1, rate: 20000, duration: "3 weeks", discount: 0, notes: [] },
          ],
        },
      ],
    },
  ]);

  const addCard = (type: ProposalCard["type"]) => {
    const newCard: ProposalCard = (() => {
      switch (type) {
        case "timeline":
          return { id: Date.now().toString(), type: "timeline", data: [{ phase: "", duration: "", tasks: "" }] };
        case "pricing":
          return { id: Date.now().toString(), type: "pricing", data: [{ id: Date.now().toString(), title: "New Section", items: [] }] };
        case "image":
          return { id: Date.now().toString(), type: "image", data: { url: "", caption: "", alt: "" } };
        case "video":
          return { id: Date.now().toString(), type: "video", data: { url: "", caption: "", type: "youtube" } };
        case "team":
          return { id: Date.now().toString(), type: "team", data: [{ name: "", role: "", bio: "", image: "" }] };
        case "implementation":
          return { id: Date.now().toString(), type: "implementation", data: [{ title: "", description: "", duration: "" }] };
        case "risk":
          return { id: Date.now().toString(), type: "risk", data: [{ risk: "", mitigation: "", impact: "medium" }] };
        case "support":
          return { id: Date.now().toString(), type: "support", data: [{ title: "", description: "", duration: "", cost: "" }] };
        case "text":
          return { id: Date.now().toString(), type: "text", data: { title: "New Section", content: "" } };
      }
    })();
    setCards([...cards, newCard]);
  };

  const updateCard = (id: string, data: any) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, data } : card)));
  };

  const removeCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const calculateGrandTotal = () => {
    return cards
      .filter((card): card is Extract<ProposalCard, { type: "pricing" }> => card.type === "pricing")
      .reduce((total, card) => {
        return (
          total +
          card.data.reduce((sectionTotal, section) => {
            return (
              sectionTotal +
              section.items.reduce((itemTotal, item) => {
                const subtotal = item.quantity * item.rate;
                const discountAmount = subtotal * (item.discount / 100);
                return itemTotal + (subtotal - discountAmount);
              }, 0)
            );
          }, 0)
        );
      }, 0);
  };

  const hasTermsAndConditions = proposalData.termsAndConditions.trim().length > 0;

  const handleSave = () => {
    toast.success("Proposal saved successfully");
  };

  const handleSend = () => {
    if (!hasTermsAndConditions) {
      toast.error("Please add Terms & Conditions before sending to client");
      return;
    }
    toast.success("Proposal sent to client");
    navigate("/proposals");
  };

  const renderCard = (card: ProposalCard) => {
    switch (card.type) {
      case "timeline":
        return <TimelineCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "pricing":
        return <PricingCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "image":
        return <ImageCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "video":
        return <VideoCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "team":
        return <TeamExpertiseCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "implementation":
        return <ImplementationPlanCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "risk":
        return <RiskMitigationCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "support":
        return <SupportMaintenanceCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "text":
        return <TextSectionCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Proposal</h1>
          <p className="text-muted-foreground">Customize your proposal details</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={() => navigate(`/proposals/${id}/preview`)} className="gap-2">
            Preview
          </Button>
          <Button onClick={handleSend} className="gap-2" disabled={!hasTermsAndConditions}>
            <Send className="w-4 h-4" />
            Send to Client
          </Button>
        </div>
      </div>

      {!hasTermsAndConditions && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Terms & Conditions are required before sending to client. Please scroll down to add them.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Proposal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={proposalData.title}
                    onChange={(e) => setProposalData({ ...proposalData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobNumber">Job Number</Label>
                  <Input
                    id="jobNumber"
                    value={proposalData.jobNumber}
                    onChange={(e) => setProposalData({ ...proposalData, jobNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input
                    id="client"
                    value={proposalData.client}
                    onChange={(e) => setProposalData({ ...proposalData, client: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preparedBy">Prepared By</Label>
                  <Input
                    id="preparedBy"
                    value={proposalData.preparedBy}
                    onChange={(e) => setProposalData({ ...proposalData, preparedBy: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Input
                  id="clientAddress"
                  value={proposalData.clientAddress}
                  onChange={(e) => setProposalData({ ...proposalData, clientAddress: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Event/Project Location</Label>
                  <Input
                    id="eventLocation"
                    value={proposalData.eventLocation}
                    onChange={(e) => setProposalData({ ...proposalData, eventLocation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={proposalData.version}
                    onChange={(e) => setProposalData({ ...proposalData, version: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventAddress">Event Address</Label>
                <Input
                  id="eventAddress"
                  value={proposalData.eventAddress}
                  onChange={(e) => setProposalData({ ...proposalData, eventAddress: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventStartDate">Event Start Date</Label>
                  <Input
                    id="eventStartDate"
                    type="date"
                    value={proposalData.eventStartDate}
                    onChange={(e) => setProposalData({ ...proposalData, eventStartDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventEndDate">Event End Date</Label>
                  <Input
                    id="eventEndDate"
                    type="date"
                    value={proposalData.eventEndDate}
                    onChange={(e) => setProposalData({ ...proposalData, eventEndDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={proposalData.contactName}
                    onChange={(e) => setProposalData({ ...proposalData, contactName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={proposalData.contactPhone}
                    onChange={(e) => setProposalData({ ...proposalData, contactPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={proposalData.contactEmail}
                    onChange={(e) => setProposalData({ ...proposalData, contactEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={proposalData.description}
                  onChange={(e) => setProposalData({ ...proposalData, description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Proposal Content</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Card
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem onClick={() => addCard("text")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Text Section
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("timeline")}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Timeline
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("pricing")}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pricing Breakdown
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("image")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("video")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Video
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("team")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Team & Expertise
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("implementation")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Implementation Plan
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("risk")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Risk Mitigation
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("support")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Support & Maintenance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-6">
            {cards.map((card) => (
              <div key={card.id}>{renderCard(card)}</div>
            ))}
          </div>

          <Card className="border-border/50 border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <CardTitle>Terms & Conditions</CardTitle>
                <span className="text-xs text-destructive font-medium">(Required)</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="terms">Add terms and conditions for this proposal</Label>
                <Textarea
                  id="terms"
                  rows={8}
                  value={proposalData.termsAndConditions}
                  onChange={(e) => setProposalData({ ...proposalData, termsAndConditions: e.target.value })}
                  placeholder="Enter terms and conditions..."
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  These terms will appear at the bottom of your proposal and must be completed before sending.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 h-fit">
          <CardHeader>
            <CardTitle>Proposal Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Created</p>
                <p className="text-xs text-muted-foreground">Oct 5, 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Last Modified</p>
                <p className="text-xs text-muted-foreground">Oct 6, 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Total Value</p>
                <p className="text-lg font-bold text-primary">${calculateGrandTotal().toLocaleString()}</p>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => navigate(`/proposals/${id}/preview`)}>
                Preview Proposal
              </Button>
              <Button variant="outline" className="w-full">
                Save as Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
