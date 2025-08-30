import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Calendar, Zap, Target } from "lucide-react";
import { UserStats } from "@/lib/types";

interface StatsGridProps {
  stats: UserStats;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  const statItems = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      label: "Classes Attended",
      value: stats.classesAttended,
      bgColor: "bg-blue-50"
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      label: "Current Streak",
      value: `${stats.streak} days`,
      bgColor: "bg-orange-50"
    },
    {
      icon: <Trophy className="h-6 w-6 text-green-600" />,
      label: "Total Classes",
      value: stats.totalClasses,
      bgColor: "bg-green-50"
    },
    {
      icon: <Target className="h-6 w-6 text-purple-600" />,
      label: "This Month",
      value: Math.floor(stats.classesAttended * 0.3), // Mock calculation
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="stats-grid">
      {statItems.map((item, index) => (
        <Card key={index} className="stats-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                {item.icon}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};