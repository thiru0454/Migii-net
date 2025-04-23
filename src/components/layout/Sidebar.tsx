import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Database,
  Home,
  Menu,
  User,
  Users,
  MessageSquare,
  LogIn,
  UserPlus,
  ShieldAlert,
  X,
  LogOut,
  Building,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const sidebarLinks = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    public: true
  }
];

// Admin-only links
const adminLinks = [
  {
    title: "Admin Dashboard",
    href: "/admin-dashboard",
    icon: ShieldAlert,
  },
  {
    title: "Manage Workers",
    href: "/admin-dashboard/workers",
    icon: Users,
  },
  {
    title: "Manage Businesses",
    href: "/admin-dashboard/businesses",
    icon: Building,
  }
];

// Business-only links
const businessLinks = [
  {
    title: "Business Dashboard",
    href: "/business-dashboard",
    icon: Building,
  },
  {
    title: "Manage Workers",
    href: "/business-dashboard/workers",
    icon: Users,
  },
  {
    title: "Projects",
    href: "/business-dashboard/projects",
    icon: Briefcase,
  }
];

// Worker-only links
const workerLinks = [
  {
    title: "Worker Portal",
    href: "/worker-login",
    icon: User,
  }
];

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const getRelevantLinks = () => {
    const links = [...sidebarLinks];
    
    if (!currentUser) {
      links.push({
        title: "Worker Registration",
        href: "/worker-registration",
        icon: UserPlus,
        public: true
      });
      return links;
    }
    
    switch (currentUser.userType) {
      case "admin":
        return [...links, ...adminLinks];
      case "business":
        return [...links, ...businessLinks];
      case "worker":
        return [...links, ...workerLinks];
      default:
        return links;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Check if the current path is a login-related path
  const isLoginPath = location.pathname === "/login" || 
                     location.pathname === "/admin-login" || 
                     location.pathname === "/business-login" ||
                     location.pathname === "/worker-login";

  return (
    <div className="relative">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col border-r bg-sidebar transition-all duration-300",
          expanded ? "w-64" : "w-16"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {expanded && (
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-xl text-sidebar-foreground"
            >
              <img src="/migii-icon.svg" alt="Migii Logo" className="h-8 w-8" />
              <span>MIGII</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpanded(!expanded)}
            className="text-sidebar-foreground"
          >
            {expanded ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 px-2">
          {getRelevantLinks().map((link) => {
            const isActive = location.pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  expanded ? "" : "justify-center",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <link.icon size={20} />
                {expanded && <span>{link.title}</span>}
              </Link>
            );
          })}

          {currentUser ? (
            <div className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all cursor-pointer mt-4",
              expanded ? "" : "justify-center",
              "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}>
              {expanded ? (
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    <User size={20} />
                    <span>{currentUser.name || currentUser.email || "User"}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogout} 
                    className="text-sidebar-foreground"
                  >
                    <LogOut size={16} />
                  </Button>
                </div>
              ) : (
                <User size={20} />
              )}
            </div>
          ) : (
            <div className="space-y-1 mt-4">
              <Link
                to="/login"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                  expanded ? "" : "justify-center",
                  isLoginPath
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <LogIn size={20} />
                {expanded && <span>Sign In</span>}
              </Link>
              {isLoginPath && expanded && (
                <div className="pl-8 space-y-1">
                  <Link
                    to="/login?tab=admin"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      location.search === "?tab=admin"
                        ? "bg-sidebar-accent/80 text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/30"
                    )}
                  >
                    <ShieldAlert size={16} />
                    <span>Admin</span>
                  </Link>
                  <Link
                    to="/login?tab=business"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      location.search === "?tab=business"
                        ? "bg-sidebar-accent/80 text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/30"
                    )}
                  >
                    <Building size={16} />
                    <span>Business</span>
                  </Link>
                  <Link
                    to="/worker-login"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      location.pathname === "/worker-login"
                        ? "bg-sidebar-accent/80 text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/30"
                    )}
                  >
                    <User size={16} />
                    <span>Worker</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="p-4">
          {expanded ? (
            <div className="flex flex-col gap-1">
              <p className="text-xs text-sidebar-foreground/60">
                Worker Management System
              </p>
              <p className="text-xs font-medium text-sidebar-foreground">
                migii v1.0.0
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="text-sidebar-foreground/60 text-xs">migii</span>
            </div>
          )}
        </div>
      </aside>
      <div
        className={cn(
          "transition-all duration-300",
          expanded ? "ml-64" : "ml-16"
        )}
      ></div>
    </div>
  );
}
