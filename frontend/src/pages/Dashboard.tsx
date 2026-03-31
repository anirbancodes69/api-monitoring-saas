import { useEffect, useState, useRef } from "react";
import {
  getDashboard,
  getEndpoint,
  addEndpoint,
  updateEndpoint,
  deleteEndpoint,
} from "../services/api";
import { removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [alerts, setAlerts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // 🚨 ALERT HISTORY STATE
  const [alertHistory, setAlertHistory] = useState<any[]>([
    // Simulated initial data
    { id: 1, endpoint_id: 1, endpoint_name: "API Gateway", severity: "critical", message: "Endpoint went DOWN", timestamp: new Date(Date.now() - 8 * 60000), status_change: "DOWN" },
    { id: 2, endpoint_id: 2, endpoint_name: "Auth Service", severity: "warning", message: "Slow response time detected", timestamp: new Date(Date.now() - 15 * 60000), status_change: "SLOW" },
    { id: 3, endpoint_id: 1, endpoint_name: "API Gateway", severity: "success", message: "Endpoint recovered", timestamp: new Date(Date.now() - 20 * 60000), status_change: "UP" },
    { id: 4, endpoint_id: 3, endpoint_name: "Payment Service", severity: "critical", message: "Multiple failed requests", timestamp: new Date(Date.now() - 35 * 60000), status_change: "DOWN" },
  ]);

  // 📈 ANALYTICS TIME-SERIES DATA STATE
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [selectedEndpointAnalytics, setSelectedEndpointAnalytics] = useState<number | null>(null);

  const previousData = useRef<any[]>([]);
  const isFirstLoad = useRef(true);

  const [form, setForm] = useState({
    name: "",
    url: "",
    method: "GET",
    expected_status: "200",
    interval: "5",
  });

  const navigate = useNavigate();

  // 🔄 FETCH + ALERT DETECTION
  const fetchData = async () => {
    const newData = await getDashboard();

    if (!isFirstLoad.current) {
      detectChanges(previousData.current, newData);
    } else {
      isFirstLoad.current = false;
    }
    previousData.current = [...newData];

    setData(newData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const i = setInterval(fetchData, 60000);
    return () => clearInterval(i);
  }, []);

  // 🚨 ALERT SYSTEM (CLEAN + AUTO REMOVE)
  const detectChanges = (oldData: any[], newData: any[]) => {
    if (!oldData || oldData.length === 0) return;

    newData.forEach((item) => {
      if (!item?.endpoint_id || !item?.name) return;

      const old = oldData.find((o) => o?.endpoint_id === item.endpoint_id);
      if (!old) return;

      if (old.status !== item.status) {
        const isDown = item.status === "DOWN";
        const text = isDown
          ? `${item.name} - Endpoint is DOWN`
          : `${item.name} - Endpoint recovered`;

        const alertType: "success" | "error" = isDown ? "error" : "success";
        const severity = isDown ? "critical" : "success";
        const alert = { id: Date.now() + Math.random(), text, type: alertType };

        // Add to toast alerts
        setAlerts((prev) => [alert, ...prev]);
        setTimeout(() => {
          setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
        }, 5000);

        // Add to alert history
        const historyEntry = {
          id: Date.now() + Math.random(),
          endpoint_id: item.endpoint_id,
          endpoint_name: item.name,
          severity,
          message: isDown ? "Endpoint went DOWN" : "Endpoint recovered",
          timestamp: new Date(),
          status_change: item.status,
        };
        setAlertHistory((prev) => [historyEntry, ...prev]);
      }
    });
  };

  // FORM
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!form.name.trim()) errors.name = "API Name is required";
    if (!form.url.trim()) errors.url = "URL is required";
    if (!/^https?:\/\/.+/.test(form.url)) errors.url = "URL must start with http:// or https://";
    if (!/^\d+$/.test(form.interval) || Number(form.interval) < 1) errors.interval = "Interval must be at least 1 minute";
    if (!/^\d+$/.test(form.expected_status)) errors.expected_status = "Status must be a number";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      url: "",
      method: "GET",
      expected_status: "200",
      interval: "5",
    });
    setFormErrors({});
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    setAdding(true);
    try {
      await addEndpoint(
        form.name.trim(),
        form.url.trim(),
        form.method,
        Number(form.expected_status),
        Number(form.interval)
      );
      await fetchData();
      resetForm();
      addAlert("Endpoint added successfully", "success");
    } catch (error) {
      addAlert("Failed to add endpoint", "error");
    }
    setAdding(false);
  };

  const handleEdit = async (e: any) => {
    setEditingId(e.endpoint_id);
    setFormErrors({});
    
    try {
      // Fetch full endpoint details to get method, expected_status, interval
      const endpoint = await getEndpoint(e.endpoint_id);
      setForm({
        name: endpoint.name || "",
        url: endpoint.url || "",
        method: endpoint.method || "GET",
        expected_status: String(endpoint.expected_status || "200"),
        interval: String(endpoint.interval || "5"),
      });
    } catch (error) {
      // Fallback to available data if fetch fails
      setForm({
        name: e.name || "",
        url: e.url || "",
        method: "GET",
        expected_status: "200",
        interval: "5",
      });
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setAdding(true);
    try {
      await updateEndpoint(editingId!, {
        name: form.name.trim(),
        url: form.url.trim(),
        method: form.method,
        expected_status: Number(form.expected_status),
        interval: Number(form.interval),
      });
      await fetchData();
      resetForm();
      addAlert("Endpoint updated successfully", "success");
    } catch (error) {
      addAlert("Failed to update endpoint", "error");
    }
    setAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this endpoint? This action cannot be undone.")) return;
    try {
      await deleteEndpoint(id);
      await fetchData();
      addAlert("Endpoint deleted successfully", "success");
    } catch (error) {
      addAlert("Failed to delete endpoint", "error");
    }
  };

  const addAlert = (text: string, alertType: "success" | "error") => {
    const alert = { id: Date.now() + Math.random(), text, type: alertType };
    setAlerts((prev) => [alert, ...prev]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
    }, 4000);
  };

  // Get last alert for an endpoint
  const getLastAlert = (endpointId: number) => {
    return alertHistory.find((a) => a.endpoint_id === endpointId);
  };

  // Format time difference (e.g., "5m ago", "2h ago")
  const formatTimeDiff = (date: any) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // Get severity badge style
  const getSeverityStyle = (severity: string) => {
    if (severity === "critical") return { bg: "#fee2e2", color: "#991b1b", icon: "🔴" };
    if (severity === "warning") return { bg: "#fef3c7", color: "#92400e", icon: "🟡" };
    return { bg: "#d1fae5", color: "#065f46", icon: "🟢" };
  };

  // 📈 GENERATE SIMULATED TIME-SERIES DATA (Last 24 hours)
  const generateTimeSeriesData = () => {
    const now = new Date();
    const chartData = [];
    
    // Generate 24 data points (1 per hour)
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = time.getHours().toString().padStart(2, "0");
      
      // Simulate response times with slight variance
      const baseTime = 150 + Math.sin(i / 5) * 50; // Base with wave pattern
      const variance = Math.random() * 60 - 30; // ±30ms variance
      const responseTime = Math.max(50, Math.round(baseTime + variance));
      
      // Simulate uptime (95-99% except for occasional dips)
      const uptime = i % 8 === 0 ? 85 + Math.random() * 10 : 96 + Math.random() * 4;
      
      chartData.push({
        time: hour + ":00",
        responseTime,
        uptime: Math.round(uptime * 100) / 100,
        hour: i,
      });
    }
    
    return chartData;
  };

  // Initialize analytics data on component mount
  useEffect(() => {
    const initialData = generateTimeSeriesData();
    setAnalyticsData(initialData);
    if (data.length > 0) {
      setSelectedEndpointAnalytics(data[0].endpoint_id);
    }
  }, [data]);

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const statusColor = (status: string) => {
    if (status === "UP") return { bg: "#d1fae5", color: "#065f46", icon: "✓" };
    if (status === "DOWN") return { bg: "#fee2e2", color: "#991b1b", icon: "⚠️" };
    return { bg: "#f3f4f6", color: "#4b5563", icon: "?" };
  };

  if (loading) return <div style={styles.loader}>
    <div style={styles.spinner}></div>
    <p>Loading your dashboard...</p>
  </div>;

  return (
    <div style={styles.page}>
      {/* TOAST ALERTS */}
      <div style={styles.toastWrap}>
        {alerts.map((a) => (
          <div key={a.id} style={{
            ...styles.toast,
            background: a.type === "error" ? "#fee2e2" : "#d1fae5",
            color: a.type === "error" ? "#991b1b" : "#065f46",
            borderLeft: `4px solid ${a.type === "error" ? "#dc2626" : "#10b981"}`,
          }}>
            {a.type === "error" ? "❌" : "✓"} {a.text}
          </div>
        ))}
      </div>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🚀 API Monitor</h1>
          <p style={styles.subtitle}>Real-time endpoint monitoring</p>
        </div>

        <div style={styles.headerRight}>
          <p style={styles.sub}>↻ Auto-refresh: 60s</p>
          <button style={styles.logout} onClick={handleLogout}>
            ← Logout
          </button>
        </div>
      </div>

      {/* FORM CARD */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>
          {editingId ? "📝 Edit Endpoint" : "➕ Add New Endpoint"}
        </h3>

        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="API Name"
              style={{
                ...styles.input,
                borderColor: formErrors.name ? "#dc2626" : "#e5e7eb",
                backgroundColor: formErrors.name ? "#fef2f2" : "#fff"
              }}
            />
            {formErrors.name && <p style={styles.error}>{formErrors.name}</p>}
          </div>

          <div style={styles.formGroup}>
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://api.example.com/health"
              style={{
                ...styles.input,
                borderColor: formErrors.url ? "#dc2626" : "#e5e7eb",
                backgroundColor: formErrors.url ? "#fef2f2" : "#fff"
              }}
            />
            {formErrors.url && <p style={styles.error}>{formErrors.url}</p>}
          </div>

          <div style={styles.formGroup}>
            <select name="method" value={form.method} onChange={handleChange} style={styles.input}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <input
              name="expected_status"
              value={form.expected_status}
              onChange={handleChange}
              placeholder="Expected Status (e.g., 200)"
              style={{
                ...styles.input,
                borderColor: formErrors.expected_status ? "#dc2626" : "#e5e7eb",
                backgroundColor: formErrors.expected_status ? "#fef2f2" : "#fff"
              }}
            />
            {formErrors.expected_status && <p style={styles.error}>{formErrors.expected_status}</p>}
          </div>

          <div style={styles.formGroup}>
            <input
              name="interval"
              value={form.interval}
              onChange={handleChange}
              placeholder="Interval (minutes, min 1)"
              style={{
                ...styles.input,
                borderColor: formErrors.interval ? "#dc2626" : "#e5e7eb",
                backgroundColor: formErrors.interval ? "#fef2f2" : "#fff"
              }}
            />
            {formErrors.interval && <p style={styles.error}>{formErrors.interval}</p>}
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              disabled={adding}
              style={{
                ...styles.primaryBtn,
                opacity: adding ? 0.7 : 1,
                cursor: adding ? "not-allowed" : "pointer"
              }}
            >
              {adding ? "Processing..." : editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                disabled={adding}
                style={styles.secondaryBtn}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ALERT HISTORY PANEL */}
      <div style={styles.alertHistorySection}>
        <h2 style={styles.sectionTitle}>🚨 Alert History</h2>
        {alertHistory.length === 0 ? (
          <p style={styles.noAlerts}>No alerts yet. Your endpoints are looking good!</p>
        ) : (
          <div style={styles.alertHistoryGrid}>
            {alertHistory.slice(0, 10).map((alert) => {
              const severity = getSeverityStyle(alert.severity);
              return (
                <div key={alert.id} style={styles.alertHistoryItem}>
                  <div style={styles.alertHistoryHeader}>
                    <div>
                      <h4 style={styles.alertEndpointName}>{alert.endpoint_name}</h4>
                      <p style={styles.alertMessage}>{alert.message}</p>
                    </div>
                    <span
                      style={{
                        ...styles.severityBadge,
                        background: severity.bg,
                        color: severity.color,
                      }}
                    >
                      {severity.icon} {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p style={styles.alertTime}>{formatTimeDiff(alert.timestamp)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 📈 ANALYTICS SECTION */}
      {data.length > 0 && (
        <div style={styles.analyticsSection}>
          <h2 style={styles.sectionTitle}>📈 Response Time Analytics (Last 24 Hours)</h2>
          
          {data.length > 1 && (
            <div style={styles.endpointTabs}>
              {data.map((endpoint) => (
                <button
                  key={endpoint.endpoint_id}
                  onClick={() => setSelectedEndpointAnalytics(endpoint.endpoint_id)}
                  style={{
                    ...styles.tab,
                    background: selectedEndpointAnalytics === endpoint.endpoint_id ? "#667eea" : "#f3f4f6",
                    color: selectedEndpointAnalytics === endpoint.endpoint_id ? "#fff" : "#1a202c",
                    borderBottom: selectedEndpointAnalytics === endpoint.endpoint_id ? "2px solid #667eea" : "none",
                  }}
                >
                  {endpoint.name}
                </button>
              ))}
            </div>
          )}

          <div style={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  style={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: 12 }}
                  label={{ value: "Response Time (ms)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip 
                  contentStyle={{
                    background: "rgba(26, 32, 44, 0.95)",
                    border: "1px solid #667eea",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                  formatter={(value) => [`${value}ms`, "Response Time"]}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#667eea" 
                  dot={{ fill: "#667eea", r: 4 }}
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                  name="Response Time (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.analyticsStats}>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Average Response</p>
              <p style={styles.statValue}>
                {Math.round(analyticsData.reduce((sum, d) => sum + d.responseTime, 0) / analyticsData.length)}ms
              </p>
            </div>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Min Response</p>
              <p style={styles.statValue}>
                {Math.min(...analyticsData.map(d => d.responseTime))}ms
              </p>
            </div>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Max Response</p>
              <p style={styles.statValue}>
                {Math.max(...analyticsData.map(d => d.responseTime))}ms
              </p>
            </div>
            <div style={styles.statBox}>
              <p style={styles.statLabel}>Avg Uptime</p>
              <p style={styles.statValue}>
                {(analyticsData.reduce((sum, d) => sum + d.uptime, 0) / analyticsData.length).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ENDPOINTS GRID OR EMPTY STATE */}
      {data.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyIcon}>📡</p>
          <h3>No Endpoints Yet</h3>
          <p>Add your first API endpoint using the form above to start monitoring.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {data.map((e: any) => {
            const s = statusColor(e.status);

            return (
              <div
                key={e.endpoint_id}
                style={styles.card}
                onMouseEnter={(ev) =>
                  (ev.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)")
                }
                onMouseLeave={(ev) =>
                  (ev.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)")
                }
              >
                <div style={styles.cardTop}>
                  <div>
                    <h3 style={styles.cardTitle}>{e.name}</h3>
                    <p style={styles.cardUrl}>{e.url}</p>
                  </div>

                  <span
                    style={{
                      ...styles.badge,
                      background: s.bg,
                      color: s.color,
                    }}
                  >
                    {s.icon} {e.status}
                  </span>
                </div>

                <div style={styles.metricsGrid}>
                  <div style={styles.metric}>
                    <p style={styles.metricLabel}>Uptime</p>
                    <p style={styles.metricValue}>{e.uptime_percentage || "0"}%</p>
                  </div>

                  <div style={styles.metric}>
                    <p style={styles.metricLabel}>Avg Response</p>
                    <p style={styles.metricValue}>{Math.round(e.avg_response_time || 0)} ms</p>
                  </div>
                </div>

                <p style={styles.time}>
                  Last checked: {e.last_checked
                    ? new Date(e.last_checked).toLocaleString()
                    : "Never"}
                </p>

                {getLastAlert(e.endpoint_id) && (
                  <div style={styles.lastAlertInfo}>
                    <span style={getSeverityStyle(getLastAlert(e.endpoint_id)?.severity).color === "#991b1b" ? styles.lastAlertBadgeCritical : styles.lastAlertBadge}>
                      Last Alert: {getLastAlert(e.endpoint_id)?.message} ({formatTimeDiff(getLastAlert(e.endpoint_id)?.timestamp)})
                    </span>
                  </div>
                )}

                <div style={styles.actions}>
                  <button style={styles.edit} onClick={() => handleEdit(e)}>
                    ✎ Edit
                  </button>
                  <button
                    style={styles.delete}
                    onClick={() => handleDelete(e.endpoint_id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* 🎨 PREMIUM MODERN STYLES */
const styles: any = {
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