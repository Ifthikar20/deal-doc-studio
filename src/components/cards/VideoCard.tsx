import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video, Trash2 } from "lucide-react";

export interface VideoCardData {
  url: string;
  caption: string;
  type: "youtube" | "vimeo" | "direct";
}

interface VideoCardProps {
  data: VideoCardData;
  onUpdate: (data: VideoCardData) => void;
  onRemove: () => void;
}

export default function VideoCard({ data, onUpdate, onRemove }: VideoCardProps) {
  const getEmbedUrl = (url: string, type: string) => {
    if (type === "youtube") {
      const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }
    if (type === "vimeo") {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : "";
    }
    return url;
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-primary" />
          <CardTitle>Video</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Video URL</Label>
          <Input
            value={data.url}
            onChange={(e) => onUpdate({ ...data, url: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
        <div className="space-y-2">
          <Label>Video Type</Label>
          <select
            value={data.type}
            onChange={(e) => onUpdate({ ...data, type: e.target.value as "youtube" | "vimeo" | "direct" })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="direct">Direct Link</option>
          </select>
        </div>
        {data.url && (
          <div className="rounded-lg overflow-hidden border border-border/50 aspect-video">
            <iframe
              src={getEmbedUrl(data.url, data.type)}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>Caption</Label>
          <Textarea
            value={data.caption}
            onChange={(e) => onUpdate({ ...data, caption: e.target.value })}
            placeholder="Video caption (optional)"
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}
