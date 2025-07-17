import { Link, useLocation } from "wouter";
import { 
  TrendingUp, 
  Briefcase, 
  Wallet, 
  Users, 
  Settings, 
  LogIn, 
  UserPlus, 
  LogOut 
} from "lucide-react";

const Sidebar = () => {
  const [location] = useLocation();

  const navigationItems = [
    { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
    { path: "/portfolio", label: "Portfolio", icon: Briefcase },
    { path: "/wallet", label: "Wallet", icon: Wallet },
    { path: "/referrals", label: "Referrals", icon: Users },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const authItems = [
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/signup", label: "Sign Up", icon: UserPlus },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard" && (location === "/" || location === "/dashboard")) {
      return true;
    }
    return location === path;
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-16 px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <h1 className="text-xl font-bold text-white">
          Okamah<span className="text-yellow-400">$</span>Vesting
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 px-4 space-y-2">
          {authItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
          
          <button className="nav-item text-red-600 hover:bg-red-50 w-full text-left">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
