import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Mail, Phone, Building2 } from "lucide-react";
import { ClientCanvas } from "@/components/ClientCanvas";
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

const mockClients = [
  { id: 1, name: "Acme Corp", email: "contact@acme.com", phone: "+1 234 567 8900", projects: 5, status: "active" },
  { id: 2, name: "TechStart Inc", email: "hello@techstart.io", phone: "+1 234 567 8901", projects: 3, status: "active" },
  { id: 3, name: "Global Solutions", email: "info@globalsol.com", phone: "+1 234 567 8902", projects: 8, status: "active" },
  { id: 4, name: "Innovate LLC", email: "team@innovate.com", phone: "+1 234 567 8903", projects: 2, status: "pending" },
];

export default function Clients() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Enter the details of your new client</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Company Name</Label>
                <Input id="client-name" placeholder="Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <Input id="client-email" type="email" placeholder="contact@acme.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Phone</Label>
                <Input id="client-phone" type="tel" placeholder="+1 234 567 8900" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Add Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockClients.map((client) => (
          <Card 
            key={client.id} 
            className="group hover:shadow-md transition-all duration-300 cursor-pointer border-border/40 hover:border-primary/20 overflow-hidden"
            onClick={() => navigate(`/proposals?client=${encodeURIComponent(client.name)}`)}
          >
            <div className="relative h-40 overflow-hidden">
              <ClientCanvas clientId={client.id} clientName={client.name} />
              <div className="absolute top-3 right-3">
                <span className="text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {client.projects} proposals
                </span>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                {client.name}
              </CardTitle>
              <CardDescription className="capitalize text-xs">{client.status} client</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{client.phone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
