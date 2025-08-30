import { useState, useEffect } from 'react';
import { UserStats, WeeklyActivity } from '@/lib/types';
import { getUserStats } from '@/lib/api/users';

export const useUserStats = (userId?: string) => {
  const [stats, setStats] = useState<UserStats>({
    classesAttended: 0,
    streak: 0,
    totalClasses: 0,
  });
  
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (userId) {
          const userStats = await getUserStats(userId);
          setStats(userStats);
        }
        
        // Mock weekly activity data for now
        const mockWeeklyActivity: WeeklyActivity[] = [
          { date: '2025-01-27', hasClass: true, isCompleted: true, classTitle: 'Morning Yoga' },
          { date: '2025-01-28', hasClass: true, isCompleted: false, classTitle: 'HIIT Training' },
          { date: '2025-01-29', hasClass: false, isCompleted: false },
          { date: '2025-01-30', hasClass: true, isCompleted: false, classTitle: 'Pilates' },
        ];
        
        setWeeklyActivity(mockWeeklyActivity);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  return { stats, weeklyActivity, isLoading, error };
};