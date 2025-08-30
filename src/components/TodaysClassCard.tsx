import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User } from "lucide-react";
import { ClassWithBookingInfo } from "@/lib/types";
import { format } from "date-fns";

interface TodaysClassCardProps {
  todaysClass?: ClassWithBookingInfo | null;
  onViewClass?: (classId: string) => void;
}

export const TodaysClassCard = ({ todaysClass, onViewClass }: TodaysClassCardProps) => {
  if (!todaysClass) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-2">No class booked for today</p>
          <p className="text-sm text-muted-foreground">
            Check the schedule to book your next workout!
          </p>
        </CardContent>
      </Card>
    );
  }

  const startTime = new Date(todaysClass.start_time);
  const endTime = new Date(todaysClass.end_time);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Today's Class</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{todaysClass.title}</h3>
          <p className="text-sm text-muted-foreground">
            {todaysClass.class_type}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            <span>{todaysClass.instructor}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewClass?.(todaysClass.id)}
            className="flex-1"
          >
            View Details
          </Button>
          <Button 
            size="sm"
            className="flex-1"
          >
            Check In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};