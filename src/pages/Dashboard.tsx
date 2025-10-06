import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/components/DashboardStats";
import { FileText, Plus, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const recentProposals = [
  { id: 1, client: "Acme Corp", status: "Draft", date: "2025-10-05", value: "$45,000" },
  { id: 2, client: "TechStart Inc", status: "Sent", date: "2025-10-04", value: "$32,500" },
  { id: 3, client: "Global Solutions", status: "Approved", date: "2025-10-03", value: "$78,000" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your proposals.</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Proposals</CardTitle>
              <CardDescription>Your latest proposal activities</CardDescription>
            </div>
            <Button onClick={() => navigate("/proposals")}>View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{proposal.client}</h4>
                      <p className="text-sm text-muted-foreground">{proposal.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">{proposal.value}</span>
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
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start working on proposals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2" onClick={() => navigate("/proposals/new")}>
              <Plus className="w-4 h-4" />
              Create New Proposal
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/clients")}>
              <Plus className="w-4 h-4" />
              Add New Client
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/templates")}>
              <FileText className="w-4 h-4" />
              Browse Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
