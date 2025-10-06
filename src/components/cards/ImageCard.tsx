import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image, Trash2 } from "lucide-react";

export interface ImageCardData {
  url: string;
  caption: string;
  alt: string;
}

interface ImageCardProps {
  data: ImageCardData;
  onUpdate: (data: ImageCardData) => void;
  onRemove: () => void;
}

export default function ImageCard({ data, onUpdate, onRemove }: ImageCardProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 text-primary" />
          <CardTitle>Image</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input
            value={data.url}
            onChange={(e) => onUpdate({ ...data, url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        {data.url && (
          <div className="rounded-lg overflow-hidden border border-border/50">
            <img src={data.url} alt={data.alt} className="w-full h-auto" />
          </div>
        )}
        <div className="space-y-2">
          <Label>Alt Text</Label>
          <Input
            value={data.alt}
            onChange={(e) => onUpdate({ ...data, alt: e.target.value })}
            placeholder="Descriptive text for accessibility"
          />
        </div>
        <div className="space-y-2">
          <Label>Caption</Label>
          <Textarea
            value={data.caption}
            onChange={(e) => onUpdate({ ...data, caption: e.target.value })}
            placeholder="Image caption (optional)"
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}
