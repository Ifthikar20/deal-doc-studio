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
  duration: string;
  discount: number;
  notes: string[];
}

interface PricingSection {
  id: string;
  title: string;
  items: PriceItem[];
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
    timeline: [
      { phase: "Discovery & Planning", duration: "2 weeks", tasks: "Requirements gathering, research" },
      { phase: "Design", duration: "3 weeks", tasks: "Wireframes, mockups, prototypes" },
      { phase: "Development", duration: "6 weeks", tasks: "Frontend and backend implementation" },
    ] as TimelinePhase[],
    pricingSections: [
      {
        id: "1",
        title: "Main Deliverables",
        items: [
          { description: "UI/UX Design", quantity: 1, rate: 15000, duration: "2 weeks", discount: 0, notes: [] },
          { description: "Frontend Development", quantity: 1, rate: 20000, duration: "3 weeks", discount: 0, notes: [] },
        ],
      },
    ] as PricingSection[],
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

  const addPricingSection = () => {
    const newSection: PricingSection = {
      id: Date.now().toString(),
      title: "New Section",
      items: [],
    };
    setProposalData({
      ...proposalData,
      pricingSections: [...proposalData.pricingSections, newSection],
    });
  };

  const removePricingSection = (sectionId: string) => {
    const newSections = proposalData.pricingSections.filter((s) => s.id !== sectionId);
    setProposalData({ ...proposalData, pricingSections: newSections });
  };

  const updatePricingSection = (sectionId: string, title: string) => {
    const newSections = proposalData.pricingSections.map((s) =>
      s.id === sectionId ? { ...s, title } : s
    );
    setProposalData({ ...proposalData, pricingSections: newSections });
  };

  const addPriceItem = (sectionId: string) => {
    const newSections = proposalData.pricingSections.map((s) =>
      s.id === sectionId
        ? { ...s, items: [...s.items, { description: "", quantity: 1, rate: 0, duration: "1 Day", discount: 0, notes: [] }] }
        : s
    );
    setProposalData({ ...proposalData, pricingSections: newSections });
  };

  const removePriceItem = (sectionId: string, itemIndex: number) => {
    const newSections = proposalData.pricingSections.map((s) =>
      s.id === sectionId
        ? { ...s, items: s.items.filter((_, i) => i !== itemIndex) }
        : s
    );
    setProposalData({ ...proposalData, pricingSections: newSections });
  };

  const updatePriceItem = (sectionId: string, itemIndex: number, field: keyof PriceItem, value: string | number | string[]) => {
    const newSections = proposalData.pricingSections.map((s) =>
      s.id === sectionId
        ? {
            ...s,
            items: s.items.map((item, i) =>
              i === itemIndex ? { ...item, [field]: value } : item
            ),
          }
        : s
    );
    setProposalData({ ...proposalData, pricingSections: newSections });
  };

  const addNoteToItem = (sectionId: string, itemIndex: number) => {
    const newSections = proposalData.pricingSections.map((s) =>
      s.id === sectionId
        ? {
            ...s,
            items: s.items.map((item, i) =>
              i === itemIndex ? { ...item, notes: [...item.notes, ""] } : item
            ),
          }
        : s
    );
    setProposalData({ ...proposalData, pricingSections: newSections });
  };

  const updateNote = (sectionId: string, itemIndex: number, noteIndex: number, value: string) => {
    const newSections = proposalData.pricingSections.map((s) =>
      s.id === sectionId
        ? {
            ...s,
            items: s.items.map((item, i) =>
              i === itemIndex
                ? { ...item, notes: item.notes.map((note, ni) => (ni === noteIndex ? value : note)) }
                : item
            ),
          }
        : s
    );
    setProposalData({ ...proposalData, pricingSections: newSections });
  };

  const removeNote = (sectionId: string, itemIndex: number, noteIndex: number) => {
    const newSections = proposalData.pricingSections.map((s) =>
      s.id === sectionId
        ? {
            ...s,
            items: s.items.map((item, i) =>
              i === itemIndex ? { ...item, notes: item.notes.filter((_, ni) => ni !== noteIndex) } : item
            ),
          }
        : s
    );
    setProposalData({ ...proposalData, pricingSections: newSections });
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
                  <Button variant="outline" size="sm" onClick={addPricingSection} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Section
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {proposalData.pricingSections.map((section) => (
                    <Card key={section.id} className="border-border/50">
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <Input
                            value={section.title}
                            onChange={(e) => updatePricingSection(section.id, e.target.value)}
                            placeholder="Section name (e.g., Main Ballroom)"
                            className="text-lg font-semibold"
                          />
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addPriceItem(section.id)}
                              className="gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add Item
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removePricingSection(section.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {section.items.map((item, itemIndex) => (
                          <Card key={itemIndex} className="border-border/50 bg-muted/20">
                            <CardContent className="pt-4 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="space-y-2 md:col-span-2">
                                  <Label className="text-xs">Description</Label>
                                  <Input
                                    value={item.description}
                                    onChange={(e) => updatePriceItem(section.id, itemIndex, "description", e.target.value)}
                                    placeholder="Item description"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Quantity</Label>
                                  <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updatePriceItem(section.id, itemIndex, "quantity", parseInt(e.target.value) || 0)}
                                    min="1"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Duration</Label>
                                  <Input
                                    value={item.duration}
                                    onChange={(e) => updatePriceItem(section.id, itemIndex, "duration", e.target.value)}
                                    placeholder="e.g., 2 Days"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Rate ($)</Label>
                                  <Input
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) => updatePriceItem(section.id, itemIndex, "rate", parseFloat(e.target.value) || 0)}
                                    min="0"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Discount (%)</Label>
                                  <Input
                                    type="number"
                                    value={item.discount}
                                    onChange={(e) => updatePriceItem(section.id, itemIndex, "discount", parseFloat(e.target.value) || 0)}
                                    min="0"
                                    max="100"
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label className="text-xs">Subtotal</Label>
                                  <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 text-sm font-medium">
                                    ${(item.quantity * item.rate).toLocaleString()}
                                  </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label className="text-xs">Discount Amount</Label>
                                  <div className="flex h-10 items-center rounded-md border border-input bg-background px-3 text-sm font-medium text-destructive">
                                    -${((item.quantity * item.rate * item.discount) / 100).toLocaleString()}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Total</Label>
                                  <div className="flex h-10 items-center rounded-md border border-input bg-primary/5 px-3 text-sm font-bold text-primary">
                                    ${calculateItemTotal(item).toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              {/* Notes */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label className="text-xs">Notes</Label>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addNoteToItem(section.id, itemIndex)}
                                    className="h-7 gap-1"
                                  >
                                    <Plus className="w-3 h-3" />
                                    Add Note
                                  </Button>
                                </div>
                                {item.notes.map((note, noteIndex) => (
                                  <div key={noteIndex} className="flex gap-2">
                                    <Input
                                      value={note}
                                      onChange={(e) => updateNote(section.id, itemIndex, noteIndex, e.target.value)}
                                      placeholder="Add a note..."
                                      className="text-sm"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeNote(section.id, itemIndex, noteIndex)}
                                      className="h-9 w-9 text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-end">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removePriceItem(section.id, itemIndex)}
                                  className="text-destructive hover:text-destructive gap-2"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Remove Item
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        <div className="flex justify-end items-center gap-4 p-4 bg-primary/5 rounded-lg">
                          <span className="text-sm font-semibold text-muted-foreground">Section Total:</span>
                          <span className="text-lg font-bold text-primary">${calculateSectionTotal(section).toLocaleString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex justify-end items-center gap-4 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-2 border-primary/20">
                    <span className="text-xl font-bold text-foreground">Grand Total:</span>
                    <span className="text-3xl font-bold text-primary">${calculateGrandTotal().toLocaleString()}</span>
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
                <p className="text-lg font-bold text-primary">${calculateGrandTotal().toLocaleString()}</p>
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
