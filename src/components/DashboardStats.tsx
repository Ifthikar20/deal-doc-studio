import { Users, FileText, Layout, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Clients",
    value: "24",
    change: "+12%",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Active Proposals",
    value: "8",
    change: "+3",
    icon: FileText,
    color: "text-accent",
  },
  {
    title: "Templates",
    value: "12",
    change: "+2",
    icon: Layout,
    color: "text-primary",
  },
  {
    title: "Success Rate",
    value: "87%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-accent",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="animate-fade-in border-border/50 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-primary font-medium">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
