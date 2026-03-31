/* Layout Styles for Sidebar Navigation */
export const layoutStyles: any = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8f9fa",
  },

  sidebar: {
    width: 260,
    background: "#0f131f",
    color: "#fff",
    padding: "24px 0",
    boxShadow: "1px 0 3px rgba(0, 0, 0, 0.08)",
    overflowY: "auto" as const,
    position: "fixed" as const,
    left: 0,
    top: 0,
    height: "100vh",
    zIndex: 1000,
  },

  sidebarLogo: {
    padding: "0 20px 32px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },

  sidebarTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    color: "#fff",
  },

  sidebarSubtitle: {
    fontSize: 11,
    color: "#94a3b8",
    margin: "4px 0 0 0",
    fontWeight: 500,
  },

  sidebarNav: {
    padding: "24px 0",
  },

  navItem: {
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    color: "#cbd5e1",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderLeft: "3px solid transparent",
    ":hover": {
      background: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
    },
  },

  navItemActive: {
    background: "rgba(59, 130, 246, 0.1)",
    color: "#3b82f6",
    borderLeft: "3px solid #3b82f6",
  },

  navIcon: {
    fontSize: 16,
    width: 20,
  },

  navSection: {
    marginTop: 24,
  },

  navSectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.3px",
    padding: "0 20px 12px 20px",
    margin: 0,
  },

  mainContent: {
    marginLeft: 260,
    flex: 1,
    padding: "32px 24px",
    maxWidth: "100%",
  },

  pageHeader: {
    marginBottom: 32,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: 700,
    margin: 0,
    color: "#0f131f",
  },

  pageSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },

  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  userInfo: {
    fontSize: 12,
    color: "#64748b",
  },

  logoutBtn: {
    background: "#fff",
    color: "#0f131f",
    border: "1px solid #e2e8f0",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.2s ease",
    ":hover": {
      background: "#f1f5f9",
      borderColor: "#cbd5e1",
    },
  },

  sidebarFooter: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(0, 0, 0, 0.2)",
  },

  userCard: {
    padding: 12,
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    fontSize: 12,
  },

  userName: {
    fontWeight: 600,
    color: "#fff",
    margin: 0,
  },

  userEmail: {
    color: "#94a3b8",
    fontSize: 11,
    margin: "4px 0 0 0",
  },
};
