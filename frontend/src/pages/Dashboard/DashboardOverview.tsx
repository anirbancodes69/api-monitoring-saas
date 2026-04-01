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
    { label: "Total", value: totalEndpoints, icon: "📡", gradient: "from-blue-500 to-cyan-500", bgGradient: "from-blue-500/10" },
    { label: "Online", value: upEndpoints, icon: "✓", gradient: "from-emerald-500 to-teal-500", bgGradient: "from-emerald-500/10" },
    { label: "Offline", value: downEndpoints, icon: "⚠️", gradient: "from-red-500 to-pink-500", bgGradient: "from-red-500/10" },
    { label: "Uptime", value: `${avgUptime}%`, icon: "📊", gradient: "from-amber-500 to-orange-500", bgGradient: "from-amber-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`group relative bg-gradient-to-br ${stat.bgGradient} to-slate-900/30 border border-slate-700/30 hover:border-slate-600/60 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-0.5`}
          >
            {/* Accent border on hover */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{stat.label}</p>
                <span className="text-2xl opacity-70">{stat.icon}</span>
              </div>
              <p className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-slate-800/20 border border-slate-700/30 rounded-xl">
          <p className="text-4xl mb-4">📡</p>
          <h3 className="text-lg font-semibold text-white mb-2">No Endpoints Yet</h3>
          <p className="text-slate-400 text-center text-sm max-w-sm">
            Go to Endpoints section to add your first API endpoint.
          </p>
        </div>
      ) : (
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-white">Recent Endpoints</h3>
            <span className="text-xs font-medium text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full">
              Top 5
            </span>
          </div>
          
          <div className="space-y-2">
            {data.slice(0, 5).map((endpoint) => (
              <div
                key={endpoint.endpoint_id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-700/20 hover:border-slate-600/30 rounded-lg transition-all duration-200"
              >
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <p className="font-medium text-white truncate text-sm lg:text-base">{endpoint.name}</p>
                  <p className="text-xs text-slate-400 truncate mt-1">{endpoint.url}</p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Status Badge */}
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                    endpoint.status === "UP"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${endpoint.status === "UP" ? "bg-emerald-400" : "bg-red-400"}`}></span>
                    {endpoint.status}
                  </span>
                  
                  {/* Uptime */}
                  <div className="text-right">
                    <p className="font-bold text-white text-sm lg:text-base">{endpoint.uptime_percentage}%</p>
                    <p className="text-xs text-slate-400">Uptime</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
