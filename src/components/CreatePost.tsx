import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Image as ImageIcon, X } from 'lucide-react';

interface CreatePostProps {
  onCreatePost: (content: string, imageUrl?: string) => Promise<void>;
  userAvatar?: string | null;
  userName?: string | null;
}

export const CreatePost = ({ onCreatePost, userAvatar, userName }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      setIsSubmitting(true);
      await onCreatePost(content, selectedImage || undefined);
      setContent('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = () => {
    // Mock image selection - in real implementation, this would open file picker
    const mockImages = [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1550259979-ed79b48d2a30?w=400&h=300&fit=crop'
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setSelectedImage(randomImage);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={userAvatar || undefined} />
            <AvatarFallback>
              {userName?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Share your fitness journey..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-none resize-none p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0"
              rows={3}
            />
            
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleImageSelect}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleImageSelect}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
                size="sm"
                className="px-6"
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};