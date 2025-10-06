import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Users } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface TeamExpertiseCardProps {
  data: TeamMember[];
  onUpdate: (data: TeamMember[]) => void;
  onRemove: () => void;
}

export default function TeamExpertiseCard({ data, onUpdate, onRemove }: TeamExpertiseCardProps) {
  const addMember = () => {
    onUpdate([...data, { name: "", role: "", bio: "", image: "" }]);
  };

  const removeMember = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onUpdate(newData);
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <CardTitle>Team & Expertise</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addMember} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Member
          </Button>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((member, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateMember(index, "name", e.target.value)}
                        placeholder="Team member name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input
                        value={member.role}
                        onChange={(e) => updateMember(index, "role", e.target.value)}
                        placeholder="e.g., Lead Developer"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={member.image}
                      onChange={(e) => updateMember(index, "image", e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={member.bio}
                      onChange={(e) => updateMember(index, "bio", e.target.value)}
                      placeholder="Brief bio and expertise"
                      rows={3}
                    />
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeMember(index)}>
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
