import { supabase } from '@/integrations/supabase/client';
import { Post, PostWithAuthor } from '@/lib/types';

export const getPosts = async (limit = 20, offset = 0): Promise<PostWithAuthor[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      user:users(name, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }

  return (data || []).map(post => ({
    ...post,
    user: post.user || { name: null, avatar_url: null },
  }));
};

export const getPost = async (id: string): Promise<PostWithAuthor | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      user:users(name, avatar_url)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return {
    ...data,
    user: data.user || { name: null, avatar_url: null },
  };
};

export const createPost = async (userId: string, content: string, imageUrl?: string) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([{
      user_id: userId,
      content,
      image_url: imageUrl,
      likes_count: 0,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }

  return data;
};

export const deletePost = async (postId: string, userId: string) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};