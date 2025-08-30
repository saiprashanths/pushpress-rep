import { supabase } from '@/integrations/supabase/client';
import { Class, ClassWithBookingInfo } from '@/lib/types';

export const getClasses = async (date?: string): Promise<Class[]> => {
  let query = supabase.from('classes').select('*').order('start_time');

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    query = query
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }

  return data || [];
};

export const getClass = async (id: string): Promise<Class | null> => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching class:', error);
    return null;
  }

  return data;
};

export const getClassesWithBookingInfo = async (
  userId?: string,
  date?: string
): Promise<ClassWithBookingInfo[]> => {
  const classes = await getClasses(date);
  
  // Mock booking info for now - will be replaced with real joins
  return classes.map(cls => ({
    ...cls,
    availableSpots: Math.max(0, cls.capacity - Math.floor(Math.random() * cls.capacity)),
    isBooked: Math.random() > 0.7,
    bookingStatus: Math.random() > 0.8 ? 'booked' : undefined,
  }));
};

export const createClass = async (classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('classes')
    .insert([classData])
    .select()
    .single();

  if (error) {
    console.error('Error creating class:', error);
    throw error;
  }

  return data;
};