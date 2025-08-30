
import { Home, Calendar, MessageCircle, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const DashboardNavigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bottom-nav">
      <NavItem 
        to="/" 
        icon={<Home size={20} />} 
        label="Home" 
        active={location.pathname === '/'} 
      />
      <NavItem 
        to="/schedule" 
        icon={<Calendar size={20} />} 
        label="Schedule" 
        active={location.pathname === '/schedule'} 
      />
      <NavItem 
        to="/social" 
        icon={<MessageCircle size={20} />} 
        label="Social" 
        active={location.pathname === '/social'} 
      />
      <NavItem 
        to="/settings" 
        icon={<Settings size={20} />} 
        label="Settings" 
        active={location.pathname === '/settings'} 
      />
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => {
  return (
    <Link to={to} className={`nav-item ${active ? 'text-primary' : 'text-gray-500'}`}>
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
};
