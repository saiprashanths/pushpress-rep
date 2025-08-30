
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}

export const StatsCard = ({ title, value, change, positive }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="flex items-baseline mt-1">
          <p className="text-2xl font-semibold">{value}</p>
          {change && (
            <span className={`ml-2 text-xs font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
