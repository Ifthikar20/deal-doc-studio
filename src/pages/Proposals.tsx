import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mockProposals = [
  { id: 1, client: "Acme Corp", title: "Website Redesign", status: "Draft", date: "2025-10-05" },
  { id: 2, client: "TechStart Inc", title: "Mobile App Development", status: "Sent", date: "2025-10-04" },
  { id: 3, client: "Global Solutions", title: "Cloud Migration", status: "Approved", date: "2025-10-03" },
];

export default function Proposals() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Proposals</h1>
          <p className="text-muted-foreground">Create and manage your proposals</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                Import PDF
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Proposal from PDF</DialogTitle>
                <DialogDescription>
                  Upload an existing PDF to create a new digital proposal
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="client-select">Select Client</Label>
                  <Input id="client-select" placeholder="Choose a client" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pdf-upload">Upload PDF</Label>
                  <Input id="pdf-upload" type="file" accept=".pdf" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setOpen(false);
                    navigate("/proposals/1");
                  }}
                >
                  Import & Edit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="gap-2" onClick={() => navigate("/proposals/new")}>
            <Plus className="w-4 h-4" />
            New Proposal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProposals.map((proposal) => (
          <Card
            key={proposal.id}
            className="hover:shadow-lg transition-all cursor-pointer border-border/50"
            onClick={() => navigate(`/proposals/${proposal.id}`)}
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{proposal.title}</CardTitle>
              <CardDescription>{proposal.client}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{proposal.date}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    proposal.status === "Approved"
                      ? "bg-green-500/10 text-green-600"
                      : proposal.status === "Sent"
                      ? "bg-blue-500/10 text-blue-600"
                      : "bg-yellow-500/10 text-yellow-600"
                  }`}
                >
                  {proposal.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
