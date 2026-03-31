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
import { styles } from "./styles";

interface Endpoint {
  endpoint_id: number;
  name: string;
}

interface AnalyticsData {
  time: string;
  responseTime: number;
  uptime: number;
  hour: number;
}

interface AnalyticsProps {
  data: Endpoint[];
  analyticsData: AnalyticsData[];
  selectedEndpointAnalytics: number | null;
  onSelectEndpoint: (endpointId: number) => void;
}

export function Analytics({
  data,
  analyticsData,
  selectedEndpointAnalytics,
  onSelectEndpoint,
}: AnalyticsProps) {
  if (data.length === 0) return null;

  const avgResponse = analyticsData.length
    ? Math.round(analyticsData.reduce((sum, d) => sum + d.responseTime, 0) / analyticsData.length)
    : 0;
  const minResponse = analyticsData.length ? Math.min(...analyticsData.map((d) => d.responseTime)) : 0;
  const maxResponse = analyticsData.length ? Math.max(...analyticsData.map((d) => d.responseTime)) : 0;
  const avgUptime = analyticsData.length
    ? (analyticsData.reduce((sum, d) => sum + d.uptime, 0) / analyticsData.length).toFixed(2)
    : "0";

  return (
    <div style={styles.analyticsSection}>
      <h2 style={styles.sectionTitle}>📈 Response Time Analytics (Last 24 Hours)</h2>

      {data.length > 1 && (
        <div style={styles.endpointTabs}>
          {data.map((endpoint) => (
            <button
              key={endpoint.endpoint_id}
              onClick={() => onSelectEndpoint(endpoint.endpoint_id)}
              style={{
                ...styles.tab,
                background: selectedEndpointAnalytics === endpoint.endpoint_id ? "#3b82f6" : "#f8f9fa",
                color: selectedEndpointAnalytics === endpoint.endpoint_id ? "#fff" : "#64748b",
                border: selectedEndpointAnalytics === endpoint.endpoint_id ? "1px solid #3b82f6" : "1px solid #e2e8f0",
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
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: 12 }} />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: 12 }}
              label={{ value: "Response Time (ms)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                background: "#0f131f",
                border: "1px solid #e2e8f0",
                borderRadius: 6,
                color: "#fff",
              }}
              formatter={(value) => [`${value}ms`, "Response Time"]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="responseTime"
              stroke="#3b82f6"
              dot={{ fill: "#3b82f6", r: 4 }}
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
          <p style={styles.statValue}>{avgResponse}ms</p>
        </div>
        <div style={styles.statBox}>
          <p style={styles.statLabel}>Min Response</p>
          <p style={styles.statValue}>{minResponse}ms</p>
        </div>
        <div style={styles.statBox}>
          <p style={styles.statLabel}>Max Response</p>
          <p style={styles.statValue}>{maxResponse}ms</p>
        </div>
        <div style={styles.statBox}>
          <p style={styles.statLabel}>Avg Uptime</p>
          <p style={styles.statValue}>{avgUptime}%</p>
        </div>
      </div>
    </div>
  );
}
