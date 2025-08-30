import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, MoreVertical, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useComments } from '@/hooks/useComments';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CommentSectionProps {
  postId: string;
  currentUserId?: string;
}

export const CommentSection = ({ postId, currentUserId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { comments, isLoading, createComment, deleteComment } = useComments(postId, currentUserId);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      await createComment(newComment);
      setNewComment('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-3 border-t">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-3 border-t">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="space-y-3 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={comment.user.avatar_url || undefined} />
                <AvatarFallback className="text-xs">
                  {comment.user.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{comment.user.name || 'Anonymous'}</p>
                    {currentUserId === comment.user_id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-3 w-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 px-3">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Comment Form */}
      {currentUserId && (
        <form onSubmit={handleSubmitComment} className="flex gap-2">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback className="text-xs">U</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="text-sm"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              size="sm" 
              disabled={!newComment.trim() || isSubmitting}
              className="px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {!currentUserId && comments.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};