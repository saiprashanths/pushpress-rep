
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { NameManager } from "@/components/NameManager";
import { useUserStore } from "@/stores/userStore";

const Index = () => {
  const user = useUserStore((state) => state.user);
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {user && (
          <p className="text-gray-500 text-sm mt-1">
            Welcome back {user.email}!
          </p>
        )}
      </div>
      
      <NameManager />
      
      <div className="stats-grid mt-6">
        <StatsCard title="Total Users" value="1,284" change="+12.5%" positive />
        <StatsCard title="Revenue" value="$8,942" change="+5.4%" positive />
        <StatsCard title="Active Projects" value="32" change="-2" />
        <StatsCard title="Conversion Rate" value="24.3%" change="+3.2%" positive />
      </div>
    </DashboardLayout>
  );
};

export default Index;
