import { Tables } from '@/integrations/supabase/types';

export type User = Tables<'users'>;
export type Class = Tables<'classes'>;
export type Booking = Tables<'bookings'>;
export type Post = Tables<'posts'>;
export type Comment = Tables<'comments'>;
export type Like = Tables<'likes'>;

export type BookingStatus = 'booked' | 'cancelled' | 'attended' | 'no_show';

export interface UserStats {
  classesAttended: number;
  streak: number;
  totalClasses: number;
  nextClass?: Class;
}

export interface ClassWithBookingInfo extends Class {
  availableSpots: number;
  isBooked?: boolean;
  bookingStatus?: BookingStatus;
}

export interface PostWithAuthor extends Post {
  user: {
    name: string | null;
    avatar_url: string | null;
  };
  isLiked?: boolean;
}

export interface CommentWithAuthor extends Comment {
  user: {
    name: string | null;
    avatar_url: string | null;
  };
}

export interface WeeklyActivity {
  date: string;
  hasClass: boolean;
  isCompleted: boolean;
  classTitle?: string;
}