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

interface AnalyticsStats {
  avgResponse: number;
  minResponse: number;
  maxResponse: number;
  avgUptime: string;
}

interface AnalyticsProps {
  data: Endpoint[];
  analyticsData: AnalyticsData[];
  analyticsStats: AnalyticsStats;
  selectedEndpointAnalytics: number | null;
  onSelectEndpoint: (endpointId: number) => void;
}

export function Analytics({
  data,
  analyticsData,
  analyticsStats,
  selectedEndpointAnalytics,
  onSelectEndpoint,
}: AnalyticsProps) {
  if (data.length === 0) return null;

  const avgResponse = analyticsStats.avgResponse;
  const minResponse = analyticsStats.minResponse;
  const maxResponse = analyticsStats.maxResponse;
  const avgUptime = analyticsStats.avgUptime;

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
        📈 Response Time Analytics
      </h2>

      {/* Endpoint Tabs */}
      {data.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {data.map((endpoint) => (
            <button
              key={endpoint.endpoint_id}
              onClick={() => onSelectEndpoint(endpoint.endpoint_id)}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                selectedEndpointAnalytics === endpoint.endpoint_id
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-800/40 border border-slate-700/30 text-slate-400 hover:text-slate-300 hover:bg-slate-800/60"
              }`}
            >
              {endpoint.name}
            </button>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: 12 }} />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: 12 }}
              label={{ value: "Response Time (ms)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              contentStyle={{
                background: "#1e293b",
                border: "1px solid #475569",
                borderRadius: 8,
                color: "#e2e8f0",
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Average Response</p>
          <p className="text-2xl lg:text-3xl font-bold text-blue-300">{avgResponse}
            <span className="text-lg text-slate-400">ms</span>
          </p>
        </div>
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Min Response</p>
          <p className="text-2xl lg:text-3xl font-bold text-emerald-300">{minResponse}
            <span className="text-lg text-slate-400">ms</span>
          </p>
        </div>
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Max Response</p>
          <p className="text-2xl lg:text-3xl font-bold text-orange-300">{maxResponse}
            <span className="text-lg text-slate-400">ms</span>
          </p>
        </div>
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 lg:p-6 backdrop-blur-sm">
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-2">Avg Uptime</p>
          <p className="text-2xl lg:text-3xl font-bold text-cyan-300">{avgUptime}
            <span className="text-lg text-slate-400">%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
