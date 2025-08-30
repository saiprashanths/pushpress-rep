import { supabase } from '@/integrations/supabase/client';
import { Comment, CommentWithAuthor } from '@/lib/types';

export const getPostComments = async (postId: string): Promise<CommentWithAuthor[]> => {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      user:users(name, avatar_url)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }

  return (data || []).map(comment => ({
    ...comment,
    user: comment.user || { name: null, avatar_url: null },
  }));
};

export const createComment = async (userId: string, postId: string, content: string) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([{
      user_id: userId,
      post_id: postId,
      content,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating comment:', error);
    throw error;
  }

  return data;
};

export const deleteComment = async (commentId: string, userId: string) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};