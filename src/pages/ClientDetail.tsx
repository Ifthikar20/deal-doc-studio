import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, MoreVertical, UserCircle, Link as LinkIcon, StickyNote } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const mockClientData = {
  "1": { name: "Acme Corp", project: "Website Redesign", location: "San Francisco, CA", date: "15 Nov, 2025", time: "2:00 PM - 5:00 PM", budget: "$25,000" },
  "2": { name: "TechStart Inc", project: "Mobile App Development", location: "Austin, TX", date: "20 Nov, 2025", time: "10:00 AM - 12:00 PM", budget: "$45,000" },
  "3": { name: "Global Solutions", project: "Brand Strategy", location: "New York, NY", date: "25 Nov, 2025", time: "1:00 PM - 4:00 PM", budget: "$35,000" },
  "4": { name: "Innovate LLC", project: "Product Launch", location: "Seattle, WA", date: "30 Nov, 2025", time: "9:00 AM - 11:00 AM", budget: "$50,000" },
};

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sections, setSections] = useState({
    overview: [] as any[],
    vendors: [] as any[],
    tasks: [] as any[],
    agenda: [] as any[],
    marketing: [] as any[],
    expenses: [] as any[],
  });

  const client = mockClientData[id as keyof typeof mockClientData] || mockClientData["1"];

  const handleAddItem = (section: string) => {
    setActiveSection(section);
  };

  const handleSaveItem = (section: string, data: any) => {
    setSections(prev => ({
      ...prev,
      [section]: [...prev[section as keyof typeof prev], data]
    }));
    setActiveSection(null);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/clients")}
            className="mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground">{client.project}</h1>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">
              {client.name}
            </Badge>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
              {client.location}
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
              {client.date}
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-0">
              {client.time}
            </Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-0">
              {client.budget}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <UserCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <LinkIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center justify-between border-b">
          <TabsList className="bg-transparent h-auto p-0">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="vendors" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Vendors
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="agenda" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Agenda
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Marketing
            </TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Expenses
            </TabsTrigger>
          </TabsList>
          
          <Button variant="ghost" size="sm" className="gap-2">
            <StickyNote className="w-4 h-4" />
            Notes 0
          </Button>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SectionCard
              title="Expenses"
              onAdd={() => handleAddItem("expenses")}
              items={sections.expenses}
              emptyText="No expenses yet. Track your spending here."
            />
            <SectionCard
              title="Vendors"
              onAdd={() => handleAddItem("vendors")}
              items={sections.vendors}
              emptyText="No vendors added yet."
            />
            <SectionCard
              title="Tasks"
              onAdd={() => handleAddItem("tasks")}
              items={sections.tasks}
              emptyText="No tasks yet. Click '+ Add' to add your first task."
            />
            <SectionCard
              title="Agenda"
              onAdd={() => handleAddItem("agenda")}
              items={sections.agenda}
              emptyText="No agenda yet. Click '+ Add' to add your first agenda item."
            />
            <SectionCard
              title="Marketing"
              onAdd={() => handleAddItem("marketing")}
              items={sections.marketing}
              emptyText="No marketing activities yet."
            />
          </div>
        </TabsContent>

        {/* Individual Section Tabs */}
        <TabsContent value="vendors" className="mt-6">
          <SectionCard
            title="Vendors"
            onAdd={() => handleAddItem("vendors")}
            items={sections.vendors}
            emptyText="No vendors added yet."
            fullWidth
          />
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <SectionCard
            title="Tasks"
            onAdd={() => handleAddItem("tasks")}
            items={sections.tasks}
            emptyText="No tasks yet. Click '+ Add' to add your first task."
            fullWidth
          />
        </TabsContent>

        <TabsContent value="agenda" className="mt-6">
          <SectionCard
            title="Agenda"
            onAdd={() => handleAddItem("agenda")}
            items={sections.agenda}
            emptyText="No agenda yet. Click '+ Add' to add your first agenda item."
            fullWidth
          />
        </TabsContent>

        <TabsContent value="marketing" className="mt-6">
          <SectionCard
            title="Marketing"
            onAdd={() => handleAddItem("marketing")}
            items={sections.marketing}
            emptyText="No marketing activities yet."
            fullWidth
          />
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <SectionCard
            title="Expenses"
            onAdd={() => handleAddItem("expenses")}
            items={sections.expenses}
            emptyText="No expenses yet. Track your spending here."
            fullWidth
          />
        </TabsContent>
      </Tabs>

      {/* Add Item Dialog */}
      <AddItemDialog
        open={!!activeSection}
        section={activeSection || ""}
        onClose={() => setActiveSection(null)}
        onSave={handleSaveItem}
      />
    </div>
  );
}

function SectionCard({ 
  title, 
  onAdd, 
  items, 
  emptyText,
  fullWidth = false 
}: { 
  title: string; 
  onAdd: () => void; 
  items: any[]; 
  emptyText: string;
  fullWidth?: boolean;
}) {
  return (
    <Card className={`${fullWidth ? 'w-full' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onAdd} className="gap-1 h-8">
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center">{emptyText}</p>
        ) : (
          <div className="w-full space-y-2">
            {items.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <p className="font-medium">{item.title || item.name}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AddItemDialog({ 
  open, 
  section, 
  onClose, 
  onSave 
}: { 
  open: boolean; 
  section: string; 
  onClose: () => void; 
  onSave: (section: string, data: any) => void;
}) {
  const [formData, setFormData] = useState({ title: "", description: "", amount: "" });

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave(section, formData);
      setFormData({ title: "", description: "", amount: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {section}</DialogTitle>
          <DialogDescription>Add a new item to {section}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>
          {section === "expenses" && (
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="$0.00"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
