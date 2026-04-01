import { useState } from "react";

interface SidebarProps {
  activeTab: "dashboard" | "endpoints" | "analytics" | "alerts";
  onTabChange: (tab: "dashboard" | "endpoints" | "analytics" | "alerts") => void;
  onLogout: () => void;
}

export function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "endpoints", label: "Endpoints", icon: "🔗" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "alerts", label: "Alert History", icon: "🚨" },
  ];

  const handleTabChange = (tab: any) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 w-60 h-screen bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-700/50 z-50 flex flex-col py-6 shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="px-6 pb-8 border-b border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-slate-900">📡</span>
            </div>
            <h2 className="text-lg font-bold text-white">APILENS</h2>
          </div>
          <p className="text-xs text-slate-400 font-medium">v1.0.0</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              onMouseEnter={() => setIsHovered(item.id)}
              onMouseLeave={() => setIsHovered(null)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-out ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/50 text-blue-300 shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
              } ${isHovered === item.id && activeTab !== item.id ? "translate-x-1" : ""}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 pt-4 border-t border-slate-700/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-3 text-slate-400 text-sm font-medium rounded-lg transition-all duration-200 hover:text-slate-200 hover:bg-slate-800/50"
          >
            <span>←</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
