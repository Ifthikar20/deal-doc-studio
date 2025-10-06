import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, HelpCircle, Plus, X } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  title: string;
  items: FAQItem[];
}

interface FAQCardProps {
  data: FAQData;
  onUpdate: (data: FAQData) => void;
  onRemove: () => void;
}

export default function FAQCard({ data, onUpdate, onRemove }: FAQCardProps) {
  const addItem = () => {
    onUpdate({
      ...data,
      items: [...data.items, { question: "", answer: "" }],
    });
  };

  const removeItem = (index: number) => {
    onUpdate({
      ...data,
      items: data.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: keyof FAQItem, value: string) => {
    const updatedItems = data.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onUpdate({ ...data, items: updatedItems });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <CardTitle>FAQ</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Section Title</Label>
          <Input
            value={data.title}
            onChange={(e) => onUpdate({ ...data, title: e.target.value })}
            placeholder="e.g., Frequently Asked Questions"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Questions & Answers</Label>
            <Button type="button" size="sm" variant="outline" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          {data.items.map((item, index) => (
            <Card key={index} className="border-border/30 p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Question</Label>
                      <Input
                        value={item.question}
                        onChange={(e) => updateItem(index, "question", e.target.value)}
                        placeholder="e.g., What if I need revisions?"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Answer</Label>
                      <Textarea
                        value={item.answer}
                        onChange={(e) => updateItem(index, "answer", e.target.value)}
                        placeholder="Provide a clear answer..."
                        rows={3}
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
