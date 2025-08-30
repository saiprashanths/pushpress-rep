import { useState, useEffect } from 'react';
import { PostWithAuthor } from '@/lib/types';
import { getPosts, createPost, deletePost } from '@/lib/api/posts';
import { likePost, unlikePost, getUserPostLike } from '@/lib/api/likes';

export const usePosts = (userId?: string) => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Mock data for placeholder images and profiles
  const mockPosts: PostWithAuthor[] = [
    {
      id: '1',
      user_id: 'user1',
      content: 'Just finished an amazing HIIT session! 💪 The energy in the room was incredible. Thanks to everyone who joined today!',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      likes_count: 12,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: {
        name: 'Sarah Johnson',
        avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      isLiked: true
    },
    {
      id: '2',
      user_id: 'user2',
      content: 'Recovery day with some gentle yoga 🧘‍♀️ Sometimes the best workout is the one that helps you restore and recharge.',
      image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      likes_count: 8,
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      user: {
        name: 'Mike Chen',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      isLiked: false
    },
    {
      id: '3',
      user_id: 'user3',
      content: 'New personal record on deadlifts today! 🎉 The journey of a thousand lifts begins with a single rep. Keep pushing your limits!',
      image_url: null,
      likes_count: 15,
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      user: {
        name: 'Alex Rivera',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      isLiked: false
    },
    {
      id: '4',
      user_id: 'user4',
      content: 'Morning run complete! 🏃‍♀️ There\'s nothing quite like watching the sunrise while getting your cardio in. Beautiful day ahead!',
      image_url: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop',
      likes_count: 6,
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      user: {
        name: 'Emma Davis',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      isLiked: true
    }
  ];

  const fetchPosts = async (offset = 0) => {
    try {
      setIsLoading(true);
      setError(null);

      // For now, use mock data. In real implementation, this would call the API
      // const fetchedPosts = await getPosts(20, offset);
      
      if (offset === 0) {
        setPosts(mockPosts);
      }
      
      setHasMore(false); // Mock: no more posts for now
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (content: string, imageUrl?: string) => {
    if (!userId) return;

    try {
      // Mock new post
      const newPost: PostWithAuthor = {
        id: Date.now().toString(),
        user_id: userId,
        content,
        image_url: imageUrl || null,
        likes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
          name: 'You',
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
        },
        isLiked: false
      };

      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      throw err;
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!userId) return;

    try {
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes_count: post.isLiked ? post.likes_count - 1 : post.likes_count + 1
          };
        }
        return post;
      }));

      // In real implementation, call the API here
      // const post = posts.find(p => p.id === postId);
      // if (post?.isLiked) {
      //   await unlikePost(userId, postId);
      // } else {
      //   await likePost(userId, postId);
      // }
    } catch (err) {
      // Revert optimistic update on error
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes_count: post.isLiked ? post.likes_count + 1 : post.likes_count - 1
          };
        }
        return post;
      }));
      setError(err instanceof Error ? err.message : 'Failed to like post');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!userId) return;

    try {
      setPosts(prev => prev.filter(post => post.id !== postId));
      // In real implementation: await deletePost(postId, userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    isLoading,
    error,
    hasMore,
    fetchPosts,
    createPost: handleCreatePost,
    likePost: handleLikePost,
    deletePost: handleDeletePost,
    loadMore: () => fetchPosts(posts.length)
  };
};