/* 🎨 MINIMAL MODERN STYLES */
export const styles: any = {
  page: {
    padding: "32px 24px",
    background: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#0f131f",
    marginBottom: 48,
    paddingBottom: 0,
    borderBottom: "none",
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.3px",
    color: "#0f131f",
  },

  subtitle: {
    fontSize: 13,
    opacity: 0.6,
    margin: "6px 0 0 0",
    color: "#64748b",
    fontWeight: 400,
  },

  headerRight: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-end",
    gap: 12,
  },

  sub: {
    fontSize: 12,
    opacity: 0.6,
    margin: 0,
    color: "#64748b",
    fontWeight: 500,
  },

  logout: {
    background: "#fff",
    backdropFilter: "none",
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

  formCard: {
    background: "#fff",
    backdropFilter: "none",
    padding: 32,
    borderRadius: 12,
    marginBottom: 48,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },

  formTitle: {
    marginTop: 0,
    marginBottom: 28,
    fontSize: 18,
    fontWeight: 600,
    color: "#0f131f",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },

  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
  },

  input: {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #e2e8f0",
    fontSize: 13,
    fontFamily: "inherit",
    transition: "all 0.2s ease",
    backgroundColor: "#f8f9fa",
    color: "#0f131f",
    ":focus": {
      outline: "none",
      borderColor: "#3b82f6",
      backgroundColor: "#fff",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.08)",
    },
  },

  error: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 6,
    margin: 0,
    fontWeight: 500,
  },

  buttonGroup: {
    display: "flex",
    gap: 12,
    gridColumn: "span 2",
  },

  primaryBtn: {
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.2s ease",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    flex: 1,
    ":hover": {
      background: "#2563eb",
    },
  },

  secondaryBtn: {
    background: "#f1f5f9",
    color: "#3b82f6",
    border: "1px solid #e2e8f0",
    padding: "10px 20px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    transition: "all 0.2s ease",
    ":hover": {
      background: "#e2e8f0",
    },
  },

  emptyState: {
    background: "#fff",
    backdropFilter: "none",
    padding: 56,
    borderRadius: 12,
    textAlign: "center" as const,
    color: "#64748b",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },

  emptyIcon: {
    fontSize: 48,
    margin: "0 0 16px 0",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    backdropFilter: "none",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
    border: "1px solid #e2e8f0",
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
    fontSize: 16,
    fontWeight: 600,
    color: "#0f131f",
  },

  cardUrl: {
    margin: "4px 0 0 0",
    fontSize: 12,
    color: "#64748b",
    wordBreak: "break-all" as const,
  },

  badge: {
    padding: "6px 12px",
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: "nowrap" as const,
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    marginBottom: 16,
  },

  metric: {
    margin: 0,
  },

  metricLabel: {
    fontSize: 11,
    color: "#94a3b8",
    margin: 0,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.3px",
  },

  metricValue: {
    fontSize: 18,
    fontWeight: 700,
    color: "#0f131f",
    margin: "6px 0 0 0",
  },

  time: {
    fontSize: 12,
    color: "#94a3b8",
    margin: "14px 0 12px 0",
    borderTop: "1px solid #e2e8f0",
    paddingTop: 12,
  },

  actions: {
    marginTop: 16,
    display: "flex",
    gap: 10,
  },

  edit: {
    background: "#fff",
    color: "#3b82f6",
    border: "1px solid #dbeafe",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
    flex: 1,
    ":hover": {
      background: "#f0f9ff",
      borderColor: "#93c5fd",
    },
  },

  delete: {
    background: "#fff",
    color: "#ef4444",
    border: "1px solid #fee2e2",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    transition: "all 0.2s ease",
    flex: 1,
    ":hover": {
      background: "#fef2f2",
      borderColor: "#fecaca",
    },
  },

  toastWrap: {
    position: "fixed" as const,
    top: 24,
    right: 24,
    zIndex: 9999,
    maxWidth: 380,
  },

  toast: {
    padding: "12px 16px",
    borderRadius: 8,
    marginBottom: 10,
    minWidth: 240,
    fontSize: 13,
    fontWeight: 500,
    backdropFilter: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    animation: "slideIn 0.3s ease",
    border: "1px solid rgba(0, 0, 0, 0.08)",
  },

  loader: {
    padding: 60,
    textAlign: "center" as const,
    color: "#3b82f6",
  },

  spinner: {
    width: 48,
    height: 48,
    border: "3px solid #e2e8f0",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },

  // Alert History Styles
  alertHistorySection: {
    background: "#fff",
    backdropFilter: "none",
    padding: 32,
    borderRadius: 12,
    marginBottom: 48,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },

  sectionTitle: {
    marginTop: 0,
    marginBottom: 28,
    fontSize: 18,
    fontWeight: 600,
    color: "#0f131f",
  },

  noAlerts: {
    color: "#94a3b8",
    textAlign: "center" as const,
    padding: "28px",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 0,
  },

  alertHistoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 16,
  },

  alertHistoryItem: {
    background: "#f8f9fa",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 16,
    transition: "all 0.2s ease",
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
    fontSize: 14,
    fontWeight: 600,
    color: "#0f131f",
  },

  alertMessage: {
    margin: 0,
    fontSize: 12,
    color: "#64748b",
  },

  severityBadge: {
    padding: "4px 10px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: "nowrap" as const,
  },

  alertTime: {
    margin: 0,
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: 500,
  },

  lastAlertInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTop: "1px solid #e2e8f0",
  },

  lastAlertBadge: {
    display: "inline-block",
    background: "#fef3c7",
    color: "#92400e",
    padding: "5px 10px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
  },

  lastAlertBadgeCritical: {
    display: "inline-block",
    background: "#fee2e2",
    color: "#991b1b",
    padding: "5px 10px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
  },

  // Analytics Styles
  analyticsSection: {
    background: "#fff",
    backdropFilter: "none",
    padding: 32,
    borderRadius: 12,
    marginBottom: 48,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
  },

  endpointTabs: {
    display: "flex",
    gap: 10,
    marginBottom: 24,
    flexWrap: "wrap" as const,
  },

  tab: {
    padding: "8px 16px",
    borderRadius: 6,
    border: "1px solid #e2e8f0",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.2s ease",
    background: "#f8f9fa",
    color: "#64748b",
    ":hover": {
      background: "#eff6ff",
      borderColor: "#bfdbfe",
      color: "#3b82f6",
    },
  },

  chartContainer: {
    marginBottom: 24,
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
  },

  analyticsStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
  },

  statBox: {
    background: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    color: "#0f131f",
    border: "1px solid #e2e8f0",
  },

  statLabel: {
    margin: 0,
    fontSize: 11,
    fontWeight: 600,
    opacity: 0.7,
    color: "#64748b",
    textTransform: "uppercase" as const,
    letterSpacing: "0.3px",
  },

  statValue: {
    margin: "8px 0 0 0",
    fontSize: 24,
    fontWeight: 700,
    color: "#3b82f6",
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
