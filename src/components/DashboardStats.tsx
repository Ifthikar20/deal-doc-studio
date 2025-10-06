import { Users, FileText, Layout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Total Clients",
    value: "24",
    change: "+12%",
    icon: Users,
    gradient: "from-primary to-primary-glow",
  },
  {
    title: "Active Proposals",
    value: "8",
    change: "+3",
    icon: FileText,
    gradient: "from-accent to-purple-500",
  },
  {
    title: "Templates",
    value: "12",
    change: "+2",
    icon: Layout,
    gradient: "from-primary to-accent",
  },
];

export function DashboardStats() {
  const navigate = useNavigate();
  
  const handleCardClick = (title: string) => {
    if (title === "Total Clients") {
      navigate("/clients");
    } else if (title === "Active Proposals") {
      navigate("/proposals");
    } else if (title === "Templates") {
      navigate("/templates");
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card 
          key={stat.title} 
          className="relative animate-fade-in border-border/50 overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-300 cursor-pointer"
          onClick={() => handleCardClick(stat.title)}
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300`} />
          
          <CardHeader className="relative flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-sm`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-semibold">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
