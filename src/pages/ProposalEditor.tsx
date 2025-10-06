import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Send, Plus, Trash2, Calendar, DollarSign, FileText, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TimelinePhase {
  phase: string;
  duration: string;
  tasks: string;
}

interface PriceItem {
  description: string;
  quantity: number;
  rate: number;
}

interface ProposalSection {
  id: string;
  title: string;
  content: string;
}

export default function ProposalEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [proposalData, setProposalData] = useState({
    title: "Website Redesign",
    client: "Acme Corp",
    description: "Complete website redesign with modern UI/UX",
    timeline: [
      { phase: "Discovery & Planning", duration: "2 weeks", tasks: "Requirements gathering, research" },
      { phase: "Design", duration: "3 weeks", tasks: "Wireframes, mockups, prototypes" },
      { phase: "Development", duration: "6 weeks", tasks: "Frontend and backend implementation" },
    ] as TimelinePhase[],
    priceBreakdown: [
      { description: "UI/UX Design", quantity: 1, rate: 15000 },
      { description: "Frontend Development", quantity: 1, rate: 20000 },
      { description: "Backend Development", quantity: 1, rate: 15000 },
    ] as PriceItem[],
    sections: [
      { id: "1", title: "Project Overview", content: "This section describes the overall project scope and objectives." },
      { id: "2", title: "Deliverables", content: "List of all deliverables and milestones." },
    ] as ProposalSection[],
    termsAndConditions: "1. Payment Terms: 50% upfront, 50% upon completion.\n2. Project timeline is subject to client feedback and approval times.\n3. Additional revisions beyond the agreed scope will be charged separately.\n4. All intellectual property rights transfer upon final payment.\n5. Either party may terminate with 30 days written notice.",
  });

  const addTimelinePhase = () => {
    setProposalData({
      ...proposalData,
      timeline: [...proposalData.timeline, { phase: "", duration: "", tasks: "" }],
    });
  };

  const removeTimelinePhase = (index: number) => {
    const newTimeline = proposalData.timeline.filter((_, i) => i !== index);
    setProposalData({ ...proposalData, timeline: newTimeline });
  };

  const updateTimelinePhase = (index: number, field: string, value: string) => {
    const newTimeline = [...proposalData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setProposalData({ ...proposalData, timeline: newTimeline });
  };

  const addPriceItem = () => {
    setProposalData({
      ...proposalData,
      priceBreakdown: [...proposalData.priceBreakdown, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const removePriceItem = (index: number) => {
    const newPriceBreakdown = proposalData.priceBreakdown.filter((_, i) => i !== index);
    setProposalData({ ...proposalData, priceBreakdown: newPriceBreakdown });
  };

  const updatePriceItem = (index: number, field: keyof PriceItem, value: string | number) => {
    const newPriceBreakdown = [...proposalData.priceBreakdown];
    newPriceBreakdown[index] = { ...newPriceBreakdown[index], [field]: value };
    setProposalData({ ...proposalData, priceBreakdown: newPriceBreakdown });
  };

  const addSection = () => {
    const newSection: ProposalSection = {
      id: Date.now().toString(),
      title: "New Section",
      content: "",
    };
    setProposalData({
      ...proposalData,
      sections: [...proposalData.sections, newSection],
    });
  };

  const removeSection = (id: string) => {
    const newSections = proposalData.sections.filter((s) => s.id !== id);
    setProposalData({ ...proposalData, sections: newSections });
  };

  const updateSection = (id: string, field: keyof ProposalSection, value: string) => {
    const newSections = proposalData.sections.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    setProposalData({ ...proposalData, sections: newSections });
  };

  const calculateTotal = () => {
    return proposalData.priceBreakdown.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
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
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={proposalData.title}
                  onChange={(e) => setProposalData({ ...proposalData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={proposalData.client}
                  onChange={(e) => setProposalData({ ...proposalData, client: e.target.value })}
                />
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

          <Tabs defaultValue="sections" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="space-y-4 mt-6">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Custom Sections</CardTitle>
                  <Button variant="outline" size="sm" onClick={addSection} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Section
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {proposalData.sections.map((section) => (
                    <Card key={section.id} className="border-border/50">
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <Label>Section Title</Label>
                              <Input
                                value={section.title}
                                onChange={(e) => updateSection(section.id, "title", e.target.value)}
                                placeholder="e.g., Project Overview"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Content</Label>
                              <Textarea
                                value={section.content}
                                onChange={(e) => updateSection(section.id, "content", e.target.value)}
                                placeholder="Add section content..."
                                rows={4}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSection(section.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4 mt-6">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Timeline Breakdown</CardTitle>
                  <Button variant="outline" size="sm" onClick={addTimelinePhase} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Phase
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {proposalData.timeline.map((phase, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <Label>Phase Name</Label>
                              <Input
                                value={phase.phase}
                                onChange={(e) => updateTimelinePhase(index, "phase", e.target.value)}
                                placeholder="e.g., Discovery & Planning"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Duration</Label>
                              <Input
                                value={phase.duration}
                                onChange={(e) => updateTimelinePhase(index, "duration", e.target.value)}
                                placeholder="e.g., 2 weeks"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Tasks</Label>
                              <Textarea
                                value={phase.tasks}
                                onChange={(e) => updateTimelinePhase(index, "tasks", e.target.value)}
                                placeholder="Key tasks and deliverables"
                                rows={2}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTimelinePhase(index)}
                            className="ml-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4 mt-6">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Price Breakdown</CardTitle>
                  <Button variant="outline" size="sm" onClick={addPriceItem} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Item
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {proposalData.priceBreakdown.map((item, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2 md:col-span-2">
                              <Label>Description</Label>
                              <Input
                                value={item.description}
                                onChange={(e) => updatePriceItem(index, "description", e.target.value)}
                                placeholder="Service or item description"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Quantity</Label>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updatePriceItem(index, "quantity", parseInt(e.target.value) || 0)}
                                min="1"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Rate ($)</Label>
                              <Input
                                type="number"
                                value={item.rate}
                                onChange={(e) => updatePriceItem(index, "rate", parseFloat(e.target.value) || 0)}
                                min="0"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label>Total</Label>
                              <div className="flex h-10 items-center rounded-md border border-input bg-muted px-3 text-sm font-medium">
                                ${(item.quantity * item.rate).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePriceItem(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex justify-end items-center gap-4 p-4 bg-primary/5 rounded-lg">
                    <span className="text-lg font-semibold text-muted-foreground">Total:</span>
                    <span className="text-2xl font-bold text-primary">${calculateTotal().toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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
                <p className="text-lg font-bold text-primary">${calculateTotal().toLocaleString()}</p>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(`/proposals/${id}/preview`)}
              >
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
