import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, DollarSign } from "lucide-react";

export interface PriceItem {
  description: string;
  quantity: number;
  rate: number;
  duration: string;
  discount: number;
  notes: string[];
}

export interface PricingSection {
  id: string;
  title: string;
  items: PriceItem[];
}

interface PricingCardProps {
  data: PricingSection[];
  onUpdate: (data: PricingSection[]) => void;
  onRemove: () => void;
}

export default function PricingCard({ data, onUpdate, onRemove }: PricingCardProps) {
  const addSection = () => {
    onUpdate([...data, { id: Date.now().toString(), title: "New Section", items: [] }]);
  };

  const removeSection = (sectionId: string) => {
    onUpdate(data.filter((s) => s.id !== sectionId));
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    onUpdate(data.map((s) => (s.id === sectionId ? { ...s, title } : s)));
  };

  const addItem = (sectionId: string) => {
    onUpdate(
      data.map((s) =>
        s.id === sectionId
          ? { ...s, items: [...s.items, { description: "", quantity: 1, rate: 0, duration: "1 Day", discount: 0, notes: [] }] }
          : s
      )
    );
  };

  const removeItem = (sectionId: string, itemIndex: number) => {
    onUpdate(
      data.map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((_, i) => i !== itemIndex) } : s
      )
    );
  };

  const updateItem = (sectionId: string, itemIndex: number, field: keyof PriceItem, value: string | number | string[]) => {
    onUpdate(
      data.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((item, i) => (i === itemIndex ? { ...item, [field]: value } : item)) }
          : s
      )
    );
  };

  const addNote = (sectionId: string, itemIndex: number) => {
    onUpdate(
      data.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((item, i) => (i === itemIndex ? { ...item, notes: [...item.notes, ""] } : item)) }
          : s
      )
    );
  };

  const updateNote = (sectionId: string, itemIndex: number, noteIndex: number, value: string) => {
    onUpdate(
      data.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((item, i) =>
                i === itemIndex ? { ...item, notes: item.notes.map((note, ni) => (ni === noteIndex ? value : note)) } : item
              ),
            }
          : s
      )
    );
  };

  const removeNote = (sectionId: string, itemIndex: number, noteIndex: number) => {
    onUpdate(
      data.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((item, i) => (i === itemIndex ? { ...item, notes: item.notes.filter((_, ni) => ni !== noteIndex) } : item)) }
          : s
      )
    );
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <CardTitle>Pricing Breakdown</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addSection} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Section
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((section) => (
          <Card key={section.id} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <Input
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                className="text-lg font-semibold"
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => addItem(section.id)}>
                  <Plus className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeSection(section.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <Card key={itemIndex} className="border-border/50">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2 col-span-2">
                            <Label>Description</Label>
                            <Input
                              value={item.description}
                              onChange={(e) => updateItem(section.id, itemIndex, "description", e.target.value)}
                              placeholder="Item description"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(section.id, itemIndex, "quantity", parseInt(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Rate ($)</Label>
                            <Input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateItem(section.id, itemIndex, "rate", parseFloat(e.target.value) || 0)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Duration</Label>
                            <Input
                              value={item.duration}
                              onChange={(e) => updateItem(section.id, itemIndex, "duration", e.target.value)}
                              placeholder="e.g., 2 weeks"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Discount (%)</Label>
                            <Input
                              type="number"
                              value={item.discount}
                              onChange={(e) => updateItem(section.id, itemIndex, "discount", parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Notes</Label>
                            <Button variant="outline" size="sm" onClick={() => addNote(section.id, itemIndex)}>
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          {item.notes.map((note, noteIndex) => (
                            <div key={noteIndex} className="flex gap-2">
                              <Input
                                value={note}
                                onChange={(e) => updateNote(section.id, itemIndex, noteIndex, e.target.value)}
                                placeholder="Add a note"
                              />
                              <Button variant="ghost" size="sm" onClick={() => removeNote(section.id, itemIndex, noteIndex)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(section.id, itemIndex)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
