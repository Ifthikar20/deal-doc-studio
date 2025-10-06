import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Star, Copy, Trash2 } from "lucide-react";

const mockTemplates = [
  { id: 1, name: "Standard Proposal", description: "Basic proposal template for most projects", uses: 15 },
  { id: 2, name: "Web Development", description: "Specialized template for web projects", uses: 8 },
  { id: 3, name: "Consulting Services", description: "Template for consulting engagements", uses: 12 },
  { id: 4, name: "Marketing Campaign", description: "For marketing and advertising proposals", uses: 6 },
];

export default function Templates() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Templates</h1>
          <p className="text-muted-foreground">Manage your proposal templates</p>
        </div>
        <Button className="gap-2">
          <FileText className="w-4 h-4" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-all border-border/50">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="flex items-center justify-between">
                {template.name}
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Used {template.uses} times</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 gap-2">
                  <Copy className="w-4 h-4" />
                  Use
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
