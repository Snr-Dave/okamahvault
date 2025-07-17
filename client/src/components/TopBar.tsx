import { Bell } from "lucide-react";
import { useLocation } from "wouter";

const TopBar = () => {
  const [location] = useLocation();

  const getPageTitle = () => {
    switch (location) {
      case "/":
      case "/dashboard":
        return "Dashboard";
      case "/portfolio":
        return "Portfolio";
      case "/wallet":
        return "Wallet";
      case "/referrals":
        return "Referrals";
      case "/settings":
        return "Settings";
      case "/login":
        return "Sign In";
      case "/signup":
        return "Sign Up";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-slate-900">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:text-slate-700 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">John Doe</p>
            <p className="text-xs text-slate-500">john@example.com</p>
          </div>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
