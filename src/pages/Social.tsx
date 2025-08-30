import { DashboardLayout } from "@/components/DashboardLayout";
import { SocialFeed } from "@/components/SocialFeed";
import { useUserStore } from "@/stores/userStore";

const Social = () => {
  const user = useUserStore((state) => state.user);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Social</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Community</span>
          </div>
        </div>
        
        <SocialFeed
          currentUserId={user?.id || 'mock-user-id'}
          currentUserAvatar={user?.name ? `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face` : null}
          currentUserName={user?.name || 'You'}
        />
      </div>
    </DashboardLayout>
  );
};

export default Social;