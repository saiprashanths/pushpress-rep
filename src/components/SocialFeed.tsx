import { useEffect, useRef } from 'react';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';
import { usePosts } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';

interface SocialFeedProps {
  currentUserId?: string;
  currentUserAvatar?: string | null;
  currentUserName?: string | null;
}

export const SocialFeed = ({ 
  currentUserId, 
  currentUserAvatar, 
  currentUserName 
}: SocialFeedProps) => {
  const {
    posts,
    isLoading,
    error,
    hasMore,
    createPost,
    likePost,
    deletePost,
    loadMore,
    fetchPosts
  } = usePosts(currentUserId);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll implementation
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  const handleRefresh = () => {
    fetchPosts();
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Failed to load posts</p>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Create Post */}
      {currentUserId && (
        <CreatePost
          onCreatePost={createPost}
          userAvatar={currentUserAvatar}
          userName={currentUserName}
        />
      )}

      {/* Posts Feed */}
      {isLoading && posts.length === 0 ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                <div className="flex gap-4">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLikePost={likePost}
              onDeletePost={deletePost}
              currentUserId={currentUserId}
            />
          ))}

          {/* Load More Trigger */}
          {hasMore && (
            <div
              ref={loadMoreRef}
              className="flex justify-center py-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading more posts...
                </div>
              ) : (
                <Button onClick={loadMore} variant="outline" size="sm">
                  Load More
                </Button>
              )}
            </div>
          )}

          {/* End of Feed */}
          {!hasMore && posts.length > 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>You're all caught up! 🎉</p>
              <p className="text-sm mt-1">Check back later for new posts</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && posts.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to share your fitness journey!
                </p>
                <Button onClick={handleRefresh} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};