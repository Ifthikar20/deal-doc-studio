import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Plus } from "lucide-react";

const mockClient = {
  id: 1,
  name: "Acme Corp",
  email: "contact@acme.com",
  phone: "+1 234 567 8900",
  status: "active"
};

const mockProposals = [
  { id: 1, title: "Website Redesign", status: "Draft", date: "2025-10-05", value: "$50,000" },
  { id: 2, title: "Mobile App Development", status: "Sent", date: "2025-10-04", value: "$75,000" },
  { id: 3, title: "Cloud Migration", status: "Approved", date: "2025-10-03", value: "$120,000" },
];

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/clients")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{mockClient.name}</h1>
            <p className="text-muted-foreground">{mockClient.email} • {mockClient.phone}</p>
          </div>
        </div>
        <Button className="gap-2" onClick={() => navigate("/proposals/new")}>
          <Plus className="w-4 h-4" />
          New Proposal
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Proposals</h2>
        <div className="space-y-3">
          {mockProposals.map((proposal) => (
            <Card
              key={proposal.id}
              className="hover:shadow-lg transition-all cursor-pointer border-border/50"
              onClick={() => navigate(`/proposals/${proposal.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      <CardDescription className="mt-1">{proposal.date}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-foreground">{proposal.value}</span>
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
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
