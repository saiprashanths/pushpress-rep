import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, MoreVertical, Trash2 } from 'lucide-react';
import { PostWithAuthor } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CommentSection } from './CommentSection';

interface PostCardProps {
  post: PostWithAuthor;
  onLikePost: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  currentUserId?: string;
}

export const PostCard = ({ post, onLikePost, onDeletePost, currentUserId }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);

  const handleLikeClick = () => {
    onLikePost(post.id);
  };

  const handleDeleteClick = () => {
    if (onDeletePost) {
      onDeletePost(post.id);
    }
  };

  const canDelete = currentUserId && post.user_id === currentUserId;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.user.avatar_url || undefined} />
              <AvatarFallback>
                {post.user.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.user.name || 'Anonymous'}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          {canDelete && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDeleteClick} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="py-0">
        <p className="text-sm mb-3 leading-relaxed">{post.content}</p>
        
        {post.image_url && (
          <div className="mb-3">
            <img
              src={post.image_url}
              alt="Post content"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLikeClick}
                className={`p-2 h-auto ${post.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
              >
                <Heart 
                  className={`h-5 w-5 mr-1 ${post.isLiked ? 'fill-current' : ''}`} 
                />
                {post.likes_count}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="p-2 h-auto text-muted-foreground"
              >
                <MessageCircle className="h-5 w-5 mr-1" />
                Comment
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto text-muted-foreground"
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {showComments && (
            <CommentSection 
              postId={post.id} 
              currentUserId={currentUserId}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};