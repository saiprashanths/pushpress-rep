
import { DashboardLayout } from "@/components/DashboardLayout";
import { GreetingCard } from "@/components/GreetingCard";
import { TodaysClassCard } from "@/components/TodaysClassCard";
import { StatsGrid } from "@/components/StatsGrid";
import { WeeklyActivity } from "@/components/WeeklyActivity";
import { useUserStore } from "@/stores/userStore";
import { useUserStats } from "@/hooks/useUserStats";

const Index = () => {
  const user = useUserStore((state) => state.user);
  const { stats, weeklyActivity, isLoading } = useUserStats(user?.id);
  
  // Mock today's class data
  const todaysClass = {
    id: '1',
    title: 'Morning HIIT',
    description: 'High intensity interval training to start your day',
    instructor: 'Sarah Johnson',
    start_time: new Date().toISOString().split('T')[0] + 'T09:00:00Z',
    end_time: new Date().toISOString().split('T')[0] + 'T10:00:00Z',
    capacity: 15,
    price: 25,
    class_type: 'HIIT',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    availableSpots: 3,
    isBooked: true,
    bookingStatus: 'booked' as const
  };
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <GreetingCard userName={user?.name} />
        
        <TodaysClassCard 
          todaysClass={todaysClass}
          onViewClass={(classId) => console.log('View class:', classId)}
        />
        
        <StatsGrid stats={stats} />
        
        <WeeklyActivity activities={weeklyActivity} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
