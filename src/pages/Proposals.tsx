import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Upload, LayoutGrid, List, MapPin, Calendar, DollarSign } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import proposalBg1 from "@/assets/proposal-bg-1.jpg";
import proposalBg2 from "@/assets/proposal-bg-2.jpg";
import proposalBg3 from "@/assets/proposal-bg-3.jpg";

const mockProposals = [
  { 
    id: 1, 
    client: "Acme Corp", 
    title: "Website Redesign", 
    status: "Draft", 
    date: "Oct 05, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "San Francisco, CA",
    value: "$50,000",
    scope: "Full website redesign with modern UI/UX",
    image: proposalBg1
  },
  { 
    id: 2, 
    client: "TechStart Inc", 
    title: "Mobile App Development", 
    status: "Sent", 
    date: "Oct 04, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Austin, TX",
    value: "$75,000",
    scope: "Native iOS and Android app development",
    image: proposalBg2
  },
  { 
    id: 3, 
    client: "Global Solutions", 
    title: "Cloud Migration", 
    status: "Approved", 
    date: "Oct 03, 2025",
    time: "9:00 AM - 11:00 AM",
    location: "New York, NY",
    value: "$120,000",
    scope: "Complete infrastructure migration to AWS",
    image: proposalBg3
  },
];

export default function Proposals() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"structured" | "list">("structured");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Proposals</h1>
          <p className="text-muted-foreground">Create and manage your proposals</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg p-1 bg-muted/30">
            <Button
              variant={viewMode === "structured" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("structured")}
              className="gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              Structured
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="w-4 h-4" />
              Title
            </Button>
          </div>
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

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all">All Proposals</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {viewMode === "structured" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProposals.map((proposal) => (
                <Card
                  key={proposal.id}
                  className="hover:shadow-xl transition-all cursor-pointer border-border/50 overflow-hidden group"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={proposal.image} 
                      alt={proposal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                        {proposal.value}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{proposal.title}</CardTitle>
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
                    <CardDescription className="font-medium text-foreground/70">
                      {proposal.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{proposal.scope}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{proposal.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{proposal.date}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {proposal.time}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {mockProposals.map((proposal) => (
                <Card
                  key={proposal.id}
                  className="hover:shadow-lg transition-all cursor-pointer border-border/50"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">{proposal.title}</CardTitle>
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
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{proposal.client}</span>
                            <span>•</span>
                            <span>{proposal.date}</span>
                            <span>•</span>
                            <span className="font-semibold text-foreground">{proposal.value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="draft" className="mt-6">
          {viewMode === "structured" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProposals.filter(p => p.status === "Draft").map((proposal) => (
                <Card
                  key={proposal.id}
                  className="hover:shadow-xl transition-all cursor-pointer border-border/50 overflow-hidden group"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={proposal.image} 
                      alt={proposal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                        {proposal.value}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{proposal.title}</CardTitle>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600">
                        {proposal.status}
                      </span>
                    </div>
                    <CardDescription className="font-medium text-foreground/70">
                      {proposal.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{proposal.scope}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{proposal.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{proposal.date}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {proposal.time}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {mockProposals.filter(p => p.status === "Draft").map((proposal) => (
                <Card
                  key={proposal.id}
                  className="hover:shadow-lg transition-all cursor-pointer border-border/50"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">{proposal.title}</CardTitle>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600">
                              {proposal.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{proposal.client}</span>
                            <span>•</span>
                            <span>{proposal.date}</span>
                            <span>•</span>
                            <span className="font-semibold text-foreground">{proposal.value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sent" className="mt-6">
          {viewMode === "structured" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProposals.filter(p => p.status === "Sent").map((proposal) => (
                <Card
                  key={proposal.id}
                  className="hover:shadow-xl transition-all cursor-pointer border-border/50 overflow-hidden group"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={proposal.image} 
                      alt={proposal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                        {proposal.value}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{proposal.title}</CardTitle>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600">
                        {proposal.status}
                      </span>
                    </div>
                    <CardDescription className="font-medium text-foreground/70">
                      {proposal.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{proposal.scope}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{proposal.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{proposal.date}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {proposal.time}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {mockProposals.filter(p => p.status === "Sent").map((proposal) => (
                <Card
                  key={proposal.id}
                  className="hover:shadow-lg transition-all cursor-pointer border-border/50"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">{proposal.title}</CardTitle>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600">
                              {proposal.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{proposal.client}</span>
                            <span>•</span>
                            <span>{proposal.date}</span>
                            <span>•</span>
                            <span className="font-semibold text-foreground">{proposal.value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          {viewMode === "structured" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProposals.filter(p => p.status === "Approved").map((proposal) => (
                <Card
                  key={proposal.id}
                  className="hover:shadow-xl transition-all cursor-pointer border-border/50 overflow-hidden group"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={proposal.image} 
                      alt={proposal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                        {proposal.value}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{proposal.title}</CardTitle>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                        {proposal.status}
                      </span>
                    </div>
                    <CardDescription className="font-medium text-foreground/70">
                      {proposal.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{proposal.scope}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{proposal.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{proposal.date}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {proposal.time}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {mockProposals.filter(p => p.status === "Approved").map((proposal) => (
                <Card
                  key={proposal.id}
                  className="hover:shadow-lg transition-all cursor-pointer border-border/50"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">{proposal.title}</CardTitle>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                              {proposal.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{proposal.client}</span>
                            <span>•</span>
                            <span>{proposal.date}</span>
                            <span>•</span>
                            <span className="font-semibold text-foreground">{proposal.value}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
