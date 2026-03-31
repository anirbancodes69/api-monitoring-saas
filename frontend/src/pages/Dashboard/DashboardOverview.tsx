import { styles } from "./styles";

interface Endpoint {
  endpoint_id: number;
  name: string;
  url: string;
  status: string;
  uptime_percentage: number;
  avg_response_time: number;
  last_checked: string;
}

interface DashboardOverviewProps {
  data: Endpoint[];
  alerts: any[];
}

export function DashboardOverview({ data }: DashboardOverviewProps) {
  const totalEndpoints = data.length;
  const upEndpoints = data.filter((e) => e.status === "UP").length;
  const downEndpoints = data.filter((e) => e.status === "DOWN").length;
  const avgUptime =
    data.length > 0
      ? (data.reduce((sum, e) => sum + (e.uptime_percentage || 0), 0) / data.length).toFixed(1)
      : 0;

  const stats = [
    { label: "Total Endpoints", value: totalEndpoints, color: "#3b82f6" },
    { label: "Online", value: upEndpoints, color: "#10b981" },
    { label: "Offline", value: downEndpoints, color: "#ef4444" },
    { label: "Avg Uptime", value: `${avgUptime}%`, color: "#f59e0b" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: "#64748b", fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: "0.3px" }}>
              {stat.label}
            </p>
            <p style={{ margin: "8px 0 0 0", fontSize: 32, fontWeight: 700, color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {data.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyIcon}>📡</p>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#0f131f" }}>No Endpoints Yet</h3>
          <p style={{ margin: 12, fontSize: 13, color: "#64748b" }}>
            Go to Endpoints section to add your first API endpoint.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            padding: 24,
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600, color: "#0f131f" }}>
            Recent Endpoints
          </h3>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
            {data.slice(0, 5).map((endpoint) => (
              <div
                key={endpoint.endpoint_id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 12,
                  background: "#f8f9fa",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: "#0f131f" }}>{endpoint.name}</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: 12, color: "#64748b" }}>{endpoint.url}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      background: endpoint.status === "UP" ? "#d1fae5" : "#fee2e2",
                      color: endpoint.status === "UP" ? "#047857" : "#991b1b",
                    }}
                  >
                    {endpoint.status === "UP" ? "✓" : "⚠️"} {endpoint.status}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0f131f", minWidth: 60, textAlign: "right" as const }}>
                    {endpoint.uptime_percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
