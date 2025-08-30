import { Card, CardContent } from "@/components/ui/card";

interface GreetingCardProps {
  userName?: string | null;
}

export const GreetingCard = ({ userName = "there" }: GreetingCardProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const displayName = userName || "there";

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          {getGreeting()}, {displayName}!
        </h2>
        <p className="text-blue-100">
          Ready for your workout today?
        </p>
      </CardContent>
    </Card>
  );
};