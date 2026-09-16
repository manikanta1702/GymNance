import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  ClipboardList,
  Apple,
  TrendingUp,
  Bot,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const navigation = [
    {
      name: "Dashboard",
      path: "/app/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Exercises",
      path: "/app/exercises",
      icon: Dumbbell,
    },
    {
      name: "Workouts",
      path: "/app/workouts",
      icon: ClipboardList,
    },
    {
      name: "Nutrition",
      path: "/app/nutrition",
      icon: Apple,
    },
    {
      name: "Progress",
      path: "/app/progress",
      icon: TrendingUp,
    },
    {
      name: "AI Coach",
      path: "/app/ai-coach",
      icon: Bot,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#070609] text-[#F7F3EA]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/[0.08] bg-[#070609]/90 backdrop-blur-xl">
        <div className="h-full px-5 flex items-center justify-between">
          <NavLink
            to="/app/dashboard"
            className="text-xl font-black tracking-tight"
          >
            <span className="text-[#F7F3EA]">Gym</span>
            <span className="text-[#D4AF37]">Nance</span>
          </NavLink>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 w-64 border-r border-white/[0.08] bg-[#09080C] flex-col">
        {/* Logo */}
        <div className="px-7 py-7 border-b border-white/[0.06]">
          <NavLink
            to="/app/dashboard"
            className="text-2xl font-black tracking-tight"
          >
            <span className="text-[#F7F3EA]">Gym</span>
            <span className="text-[#D4AF37]">Nance</span>
          </NavLink>

          <p className="mt-2 text-[10px] tracking-[0.25em] text-[#5E5964]">
            TRAIN SMARTER
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                      : "text-[#8F8998] hover:text-[#F7F3EA] hover:bg-white/[0.04]"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/[0.06]">
          {/* User */}
          <div className="flex items-center gap-3 px-3 py-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
              <span className="text-sm font-bold text-[#D4AF37]">
                {user?.full_name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {user?.full_name || "User"}
              </p>

              <p className="text-[11px] text-[#5E5964] truncate">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <NavLink
            to="/app/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#8F8998] hover:text-[#F7F3EA] hover:bg-white/[0.04] transition-all"
          >
            <Settings size={18} />
            Settings
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full mt-1 flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#8F8998] hover:text-red-400 hover:bg-red-500/[0.05] transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#070609] pt-20">
          <nav className="px-5 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium ${
                      isActive
                        ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                        : "text-[#8F8998] hover:text-[#F7F3EA] hover:bg-white/[0.04]"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}

            <div className="pt-5 mt-5 border-t border-white/[0.08]">
              <NavLink
                to="/app/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-xl text-[#8F8998]"
              >
                <Settings size={20} />
                Settings
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-[#8F8998] text-left"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}