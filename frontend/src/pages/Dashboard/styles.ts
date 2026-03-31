/* 🎨 PREMIUM MODERN STYLES */
export const styles: any = {
  page: {
    padding: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    marginBottom: 40,
    paddingBottom: 20,
    borderBottom: "2px solid rgba(255,255,255,0.1)",
  },

  title: {
    fontSize: 32,
    fontWeight: 800,
    margin: 0,
    letterSpacing: "-0.5px",
  },

  subtitle: {
    fontSize: 14,
    opacity: 0.9,
    margin: "4px 0 0 0",
  },

  headerRight: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-end",
    gap: 10,
  },

  sub: {
    fontSize: 12,
    opacity: 0.8,
    margin: 0,
  },

  logout: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "8px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.3s ease",
    ":hover": {
      background: "rgba(255,255,255,0.25)",
    },
  },

  formCard: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    padding: 30,
    borderRadius: 20,
    marginBottom: 40,
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  formTitle: {
    marginTop: 0,
    marginBottom: 25,
    fontSize: 20,
    fontWeight: 700,
    color: "#1a202c",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },

  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
  },

  input: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "2px solid #e5e7eb",
    fontSize: 14,
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
    color: "#1a202c",
    ":focus": {
      outline: "none",
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
    },
  },

  error: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 4,
    margin: 0,
  },

  buttonGroup: {
    display: "flex",
    gap: 10,
    gridColumn: "span 2",
  },

  primaryBtn: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    transition: "all 0.3s ease",
    boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
    flex: 1,
  },

  secondaryBtn: {
    background: "rgba(102, 126, 234, 0.1)",
    color: "#667eea",
    border: "1px solid #667eea",
    padding: "12px 24px",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    transition: "all 0.3s ease",
  },

  emptyState: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    padding: 60,
    borderRadius: 20,
    textAlign: "center" as const,
    color: "#4b5563",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },

  emptyIcon: {
    fontSize: 60,
    margin: "0 0 20px 0",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 24,
  },

  card: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#1a202c",
  },

  cardUrl: {
    margin: "4px 0 0 0",
    fontSize: 12,
    color: "#6b7280",
    wordBreak: "break-all" as const,
  },

  badge: {
    padding: "8px 14px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    whiteSpace: "nowrap" as const,
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 16,
  },

  metric: {
    margin: 0,
  },

  metricLabel: {
    fontSize: 11,
    color: "#9ca3af",
    margin: 0,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },

  metricValue: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1a202c",
    margin: "4px 0 0 0",
  },

  time: {
    fontSize: 12,
    color: "#9ca3af",
    margin: "12px 0 16px 0",
    borderTop: "1px solid #f3f4f6",
    paddingTop: 12,
  },

  actions: {
    marginTop: 16,
    display: "flex",
    gap: 8,
  },

  edit: {
    background: "#fbbf24",
    color: "#78350f",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.2s ease",
    flex: 1,
  },

  delete: {
    background: "#f87171",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.2s ease",
    flex: 1,
  },

  toastWrap: {
    position: "fixed" as const,
    top: 20,
    right: 20,
    zIndex: 9999,
    maxWidth: 400,
  },

  toast: {
    padding: "14px 16px",
    borderRadius: 12,
    marginBottom: 12,
    minWidth: 260,
    fontSize: 14,
    fontWeight: 600,
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    animation: "slideIn 0.3s ease",
  },

  loader: {
    padding: 80,
    textAlign: "center" as const,
    color: "#fff",
  },

  spinner: {
    width: 50,
    height: 50,
    border: "4px solid rgba(255,255,255,0.3)",
    borderTop: "4px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },

  // Alert History Styles
  alertHistorySection: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    padding: 30,
    borderRadius: 20,
    marginBottom: 40,
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  sectionTitle: {
    marginTop: 0,
    marginBottom: 24,
    fontSize: 22,
    fontWeight: 700,
    color: "#1a202c",
  },

  noAlerts: {
    color: "#9ca3af",
    textAlign: "center" as const,
    padding: "30px",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    marginBottom: 0,
  },

  alertHistoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 16,
  },

  alertHistoryItem: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    transition: "all 0.2s ease",
    ":hover": {
      borderColor: "#d1d5db",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
  },

  alertHistoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 12,
  },

  alertEndpointName: {
    margin: "0 0 4px 0",
    fontSize: 16,
    fontWeight: 700,
    color: "#1a202c",
  },

  alertMessage: {
    margin: 0,
    fontSize: 13,
    color: "#6b7280",
  },

  severityBadge: {
    padding: "6px 12px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 700,
    whiteSpace: "nowrap" as const,
  },

  alertTime: {
    margin: 0,
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: 600,
  },

  lastAlertInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1px solid #e5e7eb",
  },

  lastAlertBadge: {
    display: "inline-block",
    background: "#fef3c7",
    color: "#92400e",
    padding: "6px 10px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
  },

  lastAlertBadgeCritical: {
    display: "inline-block",
    background: "#fee2e2",
    color: "#991b1b",
    padding: "6px 10px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
  },

  // Analytics Styles
  analyticsSection: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    padding: 30,
    borderRadius: 20,
    marginBottom: 40,
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  endpointTabs: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    flexWrap: "wrap" as const,
  },

  tab: {
    padding: "8px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.2s ease",
    ":hover": {
      background: "#e0e7ff",
    },
  },

  chartContainer: {
    marginBottom: 24,
    padding: "20px",
    background: "#f9fafb",
    borderRadius: 12,
  },

  analyticsStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 16,
  },

  statBox: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: 16,
    borderRadius: 12,
    color: "#fff",
  },

  statLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 600,
    opacity: 0.9,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },

  statValue: {
    margin: "8px 0 0 0",
    fontSize: 24,
    fontWeight: 700,
  },
};

// Add CSS animations
export const injectStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    button:hover {
      transform: translateY(-2px);
    }
    button:active {
      transform: translateY(0);
    }
  `;
  if (!document.head.querySelector("[data-styles]")) {
    styleSheet.setAttribute("data-styles", "true");
    document.head.appendChild(styleSheet);
  }
};
