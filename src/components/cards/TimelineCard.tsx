import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Calendar } from "lucide-react";

export interface TimelinePhase {
  phase: string;
  duration: string;
  tasks: string;
}

interface TimelineCardProps {
  data: TimelinePhase[];
  onUpdate: (data: TimelinePhase[]) => void;
  onRemove: () => void;
}

export default function TimelineCard({ data, onUpdate, onRemove }: TimelineCardProps) {
  const addPhase = () => {
    onUpdate([...data, { phase: "", duration: "", tasks: "" }]);
  };

  const removePhase = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  const updatePhase = (index: number, field: keyof TimelinePhase, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onUpdate(newData);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <CardTitle>Project Timeline</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addPhase} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Phase
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((phase, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Phase Name</Label>
                      <Input
                        value={phase.phase}
                        onChange={(e) => updatePhase(index, "phase", e.target.value)}
                        placeholder="e.g., Discovery & Planning"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={phase.duration}
                        onChange={(e) => updatePhase(index, "duration", e.target.value)}
                        placeholder="e.g., 2 weeks"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Tasks</Label>
                    <Input
                      value={phase.tasks}
                      onChange={(e) => updatePhase(index, "tasks", e.target.value)}
                      placeholder="e.g., Requirements gathering, research"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePhase(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
