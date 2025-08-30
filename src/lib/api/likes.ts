import { supabase } from '@/integrations/supabase/client';

export const likePost = async (userId: string, postId: string) => {
  const { data, error } = await supabase
    .from('likes')
    .insert([{
      user_id: userId,
      post_id: postId,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error liking post:', error);
    throw error;
  }

  // Update post likes count
  await supabase.rpc('increment_likes', { post_id: postId });

  return data;
};

export const unlikePost = async (userId: string, postId: string) => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('post_id', postId);

  if (error) {
    console.error('Error unliking post:', error);
    throw error;
  }

  // Update post likes count
  await supabase.rpc('decrement_likes', { post_id: postId });
};

export const getUserPostLike = async (userId: string, postId: string) => {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    console.error('Error checking like status:', error);
    return false;
  }

  return !!data;
};