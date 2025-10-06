import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, FileText } from "lucide-react";

export interface TextSectionData {
  title: string;
  content: string;
}

interface TextSectionCardProps {
  data: TextSectionData;
  onUpdate: (data: TextSectionData) => void;
  onRemove: () => void;
}

export default function TextSectionCard({ data, onUpdate, onRemove }: TextSectionCardProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <CardTitle>Text Section</CardTitle>
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
            placeholder="e.g., Project Overview"
          />
        </div>
        <div className="space-y-2">
          <Label>Content</Label>
          <Textarea
            value={data.content}
            onChange={(e) => onUpdate({ ...data, content: e.target.value })}
            placeholder="Section content..."
            rows={6}
          />
        </div>
      </CardContent>
    </Card>
  );
}
