import { layoutStyles } from "./layoutStyles";

interface SidebarProps {
  activeTab: "dashboard" | "endpoints" | "analytics" | "alerts";
  onTabChange: (tab: "dashboard" | "endpoints" | "analytics" | "alerts") => void;
  onLogout: () => void;
}

export function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "endpoints", label: "Endpoints", icon: "🔗" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "alerts", label: "Alert History", icon: "🚨" },
  ];

  return (
    <div style={layoutStyles.sidebar}>
      {/* Logo */}
      <div style={layoutStyles.sidebarLogo}>
        <h2 style={layoutStyles.sidebarTitle}>API Monitor</h2>
        <p style={layoutStyles.sidebarSubtitle}>v1.0.0</p>
      </div>

      {/* Navigation */}
      <nav style={layoutStyles.sidebarNav}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id as any)}
            style={{
              ...layoutStyles.navItem,
              ...(activeTab === item.id ? layoutStyles.navItemActive : {}),
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left" as const,
            }}
          >
            <span style={layoutStyles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={layoutStyles.sidebarFooter}>
        <button
          onClick={onLogout}
          style={{
            background: "transparent",
            border: "none",
            color: "#cbd5e1",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            width: "100%",
            textAlign: "left" as const,
            padding: "8px 0",
            transition: "color 0.2s ease",
          }}
        >
          ← Logout
        </button>
      </div>
    </div>
  );
}
