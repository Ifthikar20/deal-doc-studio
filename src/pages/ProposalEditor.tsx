import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Send, Plus, Trash2, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

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
    ],
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

  const handleSave = () => {
    toast.success("Proposal saved successfully");
  };

  const handleSend = () => {
    toast.success("Proposal sent to client");
    navigate("/proposals");
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
          <Button onClick={handleSend} className="gap-2">
            <Send className="w-4 h-4" />
            Send to Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50">
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Timeline Breakdown</Label>
                <Button variant="outline" size="sm" onClick={addTimelinePhase} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Phase
                </Button>
              </div>

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
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
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
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
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
