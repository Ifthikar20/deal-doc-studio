import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ClipboardList } from "lucide-react";

export interface ImplementationStep {
  title: string;
  description: string;
  duration: string;
}

interface ImplementationPlanCardProps {
  data: ImplementationStep[];
  onUpdate: (data: ImplementationStep[]) => void;
  onRemove: () => void;
}

export default function ImplementationPlanCard({ data, onUpdate, onRemove }: ImplementationPlanCardProps) {
  const addStep = () => {
    onUpdate([...data, { title: "", description: "", duration: "" }]);
  };

  const removeStep = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, field: keyof ImplementationStep, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onUpdate(newData);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary" />
          <CardTitle>Implementation Plan</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addStep} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Step
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((step, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Step Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => updateStep(index, "title", e.target.value)}
                        placeholder="e.g., Initial Setup"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={step.duration}
                        onChange={(e) => updateStep(index, "duration", e.target.value)}
                        placeholder="e.g., 1 week"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => updateStep(index, "description", e.target.value)}
                      placeholder="Detailed description of this step"
                      rows={3}
                    />
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeStep(index)}>
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
