import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/components/DashboardStats";
import { FileText, Plus, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const allProposals = [
  { id: 1, client: "Acme Corp", status: "Draft", date: "2025-10-05", value: "$45,000" },
  { id: 2, client: "TechStart Inc", status: "Sent", date: "2025-10-04", value: "$32,500" },
  { id: 3, client: "Global Solutions", status: "Approved", date: "2025-10-03", value: "$78,000" },
  { id: 4, client: "Innovate LLC", status: "Draft", date: "2025-10-02", value: "$56,000" },
  { id: 5, client: "FutureTech", status: "Sent", date: "2025-10-01", value: "$92,000" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const recentProposals = allProposals.slice(0, 3);
  const hasMoreProposals = allProposals.length > 3;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl opacity-30 -z-10" />
        <h1 className="text-4xl font-bold text-foreground mb-2 bg-clip-text">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Welcome back! Here's an overview of your proposals.</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 shadow-sm hover:shadow-[var(--shadow-elegant)] transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Proposals</CardTitle>
              <CardDescription>Your latest proposal activities</CardDescription>
            </div>
            {hasMoreProposals && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2">
                    View All
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-background border-border z-50">
                  {allProposals.map((proposal) => (
                    <DropdownMenuItem
                      key={proposal.id}
                      className="cursor-pointer p-4"
                      onClick={() => navigate(`/proposals/${proposal.id}`)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{proposal.client}</p>
                            <p className="text-xs text-muted-foreground">{proposal.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{proposal.value}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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

        <Card className="border-border/50 shadow-sm hover:shadow-[var(--shadow-elegant)] transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Start working on proposals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2 shadow-sm hover:shadow-md transition-shadow" onClick={() => navigate("/proposals/new")}>
              <Plus className="w-4 h-4" />
              Create New Proposal
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all" onClick={() => navigate("/clients")}>
              <Plus className="w-4 h-4" />
              Add New Client
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all" onClick={() => navigate("/templates")}>
              <FileText className="w-4 h-4" />
              Browse Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
