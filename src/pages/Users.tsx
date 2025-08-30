
import { DashboardLayout } from "@/components/DashboardLayout";

const Users = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your users
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500">Users management coming soon</p>
      </div>
    </DashboardLayout>
  );
};

export default Users;
