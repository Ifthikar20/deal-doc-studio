import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Wrench } from "lucide-react";

export interface SupportItem {
  title: string;
  description: string;
  duration: string;
  cost: string;
}

interface SupportMaintenanceCardProps {
  data: SupportItem[];
  onUpdate: (data: SupportItem[]) => void;
  onRemove: () => void;
}

export default function SupportMaintenanceCard({ data, onUpdate, onRemove }: SupportMaintenanceCardProps) {
  const addItem = () => {
    onUpdate([...data, { title: "", description: "", duration: "", cost: "" }]);
  };

  const removeItem = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof SupportItem, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onUpdate(newData);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-primary" />
          <CardTitle>Support & Maintenance</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Service Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateItem(index, "title", e.target.value)}
                        placeholder="e.g., 24/7 Support"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={item.duration}
                        onChange={(e) => updateItem(index, "duration", e.target.value)}
                        placeholder="e.g., 12 months"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Cost</Label>
                      <Input
                        value={item.cost}
                        onChange={(e) => updateItem(index, "cost", e.target.value)}
                        placeholder="e.g., $500/mo"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                      placeholder="Details of support/maintenance service"
                      rows={3}
                    />
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeItem(index)}>
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
