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
import { useProposal } from "@/contexts/ProposalContext";

// Card imports
import TimelineCard from "@/components/cards/TimelineCard";
import PricingCard from "@/components/cards/PricingCard";
import ImageCard from "@/components/cards/ImageCard";
import VideoCard from "@/components/cards/VideoCard";
import TeamExpertiseCard from "@/components/cards/TeamExpertiseCard";
import ImplementationPlanCard from "@/components/cards/ImplementationPlanCard";
import RiskMitigationCard from "@/components/cards/RiskMitigationCard";
import SupportMaintenanceCard from "@/components/cards/SupportMaintenanceCard";
import TextSectionCard from "@/components/cards/TextSectionCard";
import InfographicSummaryCard from "@/components/cards/InfographicSummaryCard";
import BeforeAfterCard from "@/components/cards/BeforeAfterCard";
import FAQCard from "@/components/cards/FAQCard";

export default function ProposalEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { proposalData, setProposalData, cards, addCard, updateCard, removeCard } = useProposal();

  const calculateGrandTotal = () => {
    return cards
      .filter((card): card is Extract<typeof cards[number], { type: "pricing" }> => card.type === "pricing")
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

  const renderCard = (card: typeof cards[number]) => {
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
      case "infographic":
        return <InfographicSummaryCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "beforeafter":
        return <BeforeAfterCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
      case "faq":
        return <FAQCard data={card.data} onUpdate={(data) => updateCard(card.id, data)} onRemove={() => removeCard(card.id)} />;
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
                <DropdownMenuItem onClick={() => addCard("infographic")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Infographic Summary
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("beforeafter")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Before & After Scenario
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCard("faq")}>
                  <FileText className="w-4 h-4 mr-2" />
                  FAQ
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
