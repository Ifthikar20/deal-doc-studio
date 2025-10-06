import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, BarChart3, Plus, X } from "lucide-react";

export interface InfographicItem {
  label: string;
  value: string;
  icon?: string;
}

export interface InfographicSummaryData {
  title: string;
  items: InfographicItem[];
}

interface InfographicSummaryCardProps {
  data: InfographicSummaryData;
  onUpdate: (data: InfographicSummaryData) => void;
  onRemove: () => void;
}

export default function InfographicSummaryCard({ data, onUpdate, onRemove }: InfographicSummaryCardProps) {
  const addItem = () => {
    onUpdate({
      ...data,
      items: [...data.items, { label: "", value: "" }],
    });
  };

  const removeItem = (index: number) => {
    onUpdate({
      ...data,
      items: data.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: keyof InfographicItem, value: string) => {
    const updatedItems = data.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onUpdate({ ...data, items: updatedItems });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <CardTitle>Infographic Summary</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.title}
            onChange={(e) => onUpdate({ ...data, title: e.target.value })}
            placeholder="e.g., Key Benefits at a Glance"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Benefits & Numbers</Label>
            <Button type="button" size="sm" variant="outline" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {data.items.map((item, index) => (
            <Card key={index} className="border-border/30 p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={item.label}
                        onChange={(e) => updateItem(index, "label", e.target.value)}
                        placeholder="e.g., ROI Increase"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Value</Label>
                      <Input
                        value={item.value}
                        onChange={(e) => updateItem(index, "value", e.target.value)}
                        placeholder="e.g., 150%"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
