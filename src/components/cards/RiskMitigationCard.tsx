import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ShieldAlert } from "lucide-react";

export interface Risk {
  risk: string;
  mitigation: string;
  impact: "low" | "medium" | "high";
}

interface RiskMitigationCardProps {
  data: Risk[];
  onUpdate: (data: Risk[]) => void;
  onRemove: () => void;
}

export default function RiskMitigationCard({ data, onUpdate, onRemove }: RiskMitigationCardProps) {
  const addRisk = () => {
    onUpdate([...data, { risk: "", mitigation: "", impact: "medium" }]);
  };

  const removeRisk = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  const updateRisk = (index: number, field: keyof Risk, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onUpdate(newData);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-primary" />
          <CardTitle>Risk Mitigation</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addRisk} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Risk
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((risk, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Risk</Label>
                    <Input
                      value={risk.risk}
                      onChange={(e) => updateRisk(index, "risk", e.target.value)}
                      placeholder="e.g., Project delays"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Impact Level</Label>
                    <select
                      value={risk.impact}
                      onChange={(e) => updateRisk(index, "impact", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Mitigation Strategy</Label>
                    <Textarea
                      value={risk.mitigation}
                      onChange={(e) => updateRisk(index, "mitigation", e.target.value)}
                      placeholder="How we'll address this risk"
                      rows={3}
                    />
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeRisk(index)}>
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
