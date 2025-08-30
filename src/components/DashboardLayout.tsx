
import { ReactNode } from 'react';
import { DashboardNavigation } from './DashboardNavigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      <main className="flex-1 dashboard-container">
        {children}
      </main>
      <DashboardNavigation />
    </div>
  );
};
