import { supabase } from '@/integrations/supabase/client';
import { Booking, BookingStatus } from '@/lib/types';

export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('booked_at', { ascending: false });

  if (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }

  return data || [];
};

export const getClassBookings = async (classId: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('class_id', classId)
    .eq('status', 'booked');

  if (error) {
    console.error('Error fetching class bookings:', error);
    throw error;
  }

  return data || [];
};

export const createBooking = async (userId: string, classId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      user_id: userId,
      class_id: classId,
      status: 'booked' as BookingStatus,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating booking:', error);
    throw error;
  }

  return data;
};

export const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error('Error updating booking:', error);
    throw error;
  }

  return data;
};

export const cancelBooking = async (bookingId: string) => {
  return updateBookingStatus(bookingId, 'cancelled');
};