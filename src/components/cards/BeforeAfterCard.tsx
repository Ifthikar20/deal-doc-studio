import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Trash2, GitCompare } from "lucide-react";

export interface BeforeAfterData {
  title: string;
  beforeTitle: string;
  beforeDescription: string;
  afterTitle: string;
  afterDescription: string;
}

interface BeforeAfterCardProps {
  data: BeforeAfterData;
  onUpdate: (data: BeforeAfterData) => void;
  onRemove: () => void;
}

export default function BeforeAfterCard({ data, onUpdate, onRemove }: BeforeAfterCardProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-primary" />
          <CardTitle>Before & After Scenario</CardTitle>
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
            placeholder="e.g., Transform Your Business"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">Before</Label>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input
                value={data.beforeTitle}
                onChange={(e) => onUpdate({ ...data, beforeTitle: e.target.value })}
                placeholder="e.g., Current Challenges"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea
                value={data.beforeDescription}
                onChange={(e) => onUpdate({ ...data, beforeDescription: e.target.value })}
                placeholder="Describe the current situation and pain points..."
                rows={6}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">After</Label>
            <div className="space-y-2">
              <Label className="text-xs">Title</Label>
              <Input
                value={data.afterTitle}
                onChange={(e) => onUpdate({ ...data, afterTitle: e.target.value })}
                placeholder="e.g., With Our Solution"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Description</Label>
              <Textarea
                value={data.afterDescription}
                onChange={(e) => onUpdate({ ...data, afterDescription: e.target.value })}
                placeholder="Describe the improved situation and benefits..."
                rows={6}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
