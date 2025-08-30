import { useState, useEffect } from 'react';
import { CommentWithAuthor } from '@/lib/types';
import { getPostComments, createComment, deleteComment } from '@/lib/api/comments';

export const useComments = (postId: string, userId?: string) => {
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock comments data
  const mockCommentsData: { [key: string]: CommentWithAuthor[] } = {
    '1': [
      {
        id: 'c1',
        post_id: '1',
        user_id: 'user5',
        content: 'Looks like an amazing workout! Wish I could have joined 💪',
        created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        user: {
          name: 'Jordan Smith',
          avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
        }
      },
      {
        id: 'c2',
        post_id: '1',
        user_id: 'user1',
        content: 'Thanks! You should definitely join us next time 😊',
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        user: {
          name: 'Sarah Johnson',
          avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
        }
      }
    ],
    '2': [
      {
        id: 'c3',
        post_id: '2',
        user_id: 'user6',
        content: 'Recovery days are so important! Great reminder 🙏',
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        user: {
          name: 'Taylor Wilson',
          avatar_url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face'
        }
      }
    ],
    '3': [
      {
        id: 'c4',
        post_id: '3',
        user_id: 'user7',
        content: 'Congratulations on the PR! What was your previous record?',
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        user: {
          name: 'Casey Brown',
          avatar_url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face'
        }
      },
      {
        id: 'c5',
        post_id: '3',
        user_id: 'user3',
        content: 'Thanks! Previous was 185lbs, hit 200lbs today! 🎉',
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        user: {
          name: 'Alex Rivera',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
        }
      }
    ]
  };

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // For now, use mock data. In real implementation:
      // const fetchedComments = await getPostComments(postId);
      const mockComments = mockCommentsData[postId] || [];
      setComments(mockComments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateComment = async (content: string) => {
    if (!userId || !content.trim()) return;

    try {
      // Mock new comment
      const newComment: CommentWithAuthor = {
        id: Date.now().toString(),
        post_id: postId,
        user_id: userId,
        content: content.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
          name: 'You',
          avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'
        }
      };

      setComments(prev => [...prev, newComment]);

      // In real implementation: await createComment(userId, postId, content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create comment');
      throw err;
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!userId) return;

    try {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
      // In real implementation: await deleteComment(commentId, userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete comment');
      throw err;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return {
    comments,
    isLoading,
    error,
    createComment: handleCreateComment,
    deleteComment: handleDeleteComment,
    refreshComments: fetchComments
  };
};