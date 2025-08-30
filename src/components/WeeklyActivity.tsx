import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyActivity as WeeklyActivityType } from "@/lib/types";
import { format, startOfWeek, addDays } from "date-fns";

interface WeeklyActivityProps {
  activities: WeeklyActivityType[];
}

export const WeeklyActivity = ({ activities }: WeeklyActivityProps) => {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
  
  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const activity = activities.find(a => a.date === dateStr);
    
    return {
      date,
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      isToday: format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'),
      activity
    };
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <span className="text-xs text-muted-foreground font-medium">
                {day.dayName}
              </span>
              
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${day.isToday 
                    ? 'bg-primary text-primary-foreground' 
                    : day.activity?.isCompleted 
                      ? 'bg-green-100 text-green-700'
                      : day.activity?.hasClass
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-500'
                  }
                `}
              >
                {day.dayNumber}
              </div>
              
              <div className="w-2 h-2">
                {day.activity?.hasClass && (
                  <div 
                    className={`
                      w-2 h-2 rounded-full
                      ${day.activity.isCompleted 
                        ? 'bg-green-500' 
                        : 'bg-blue-500'
                      }
                    `}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Scheduled</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Completed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};