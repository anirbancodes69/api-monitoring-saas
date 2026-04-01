import { statusColor, getSeverityStyle, formatTimeDiff } from "./utils";

interface LastAlert {
  message: string;
  severity: string;
  timestamp: Date;
}

interface EndpointCardProps {
  endpoint: any;
  lastAlert: LastAlert | undefined;
  onEdit: (endpoint: any) => void;
  onDelete: (id: number) => void;
}

export function EndpointCard({ endpoint, lastAlert, onEdit, onDelete }: EndpointCardProps) {
  const s = statusColor(endpoint.status);

  const statusBgColor = endpoint.status === "UP" ? "bg-emerald-500/20" : "bg-red-500/20";
  const statusBorderColor = endpoint.status === "UP" ? "border-emerald-500/30" : "border-red-500/30";
  const statusTextColor = endpoint.status === "UP" ? "text-emerald-300" : "text-red-300";

  return (
    <div className="group relative bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 hover:border-slate-600/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-0.5">
      {/* Card Top - Title and Status */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white truncate text-base lg:text-lg">{endpoint.name}</h3>
          <p className="text-xs lg:text-sm text-slate-400 truncate mt-1">{endpoint.url}</p>
        </div>

        <span className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusBgColor} ${statusBorderColor} ${statusTextColor} border`}>
          <span className={`w-2 h-2 rounded-full ${endpoint.status === "UP" ? "bg-emerald-400" : "bg-red-400"}`}></span>
          {endpoint.status}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-700/30">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Uptime</p>
          <p className="text-xl lg:text-2xl font-bold text-blue-300 mt-1">{endpoint.uptime_percentage || "0"}%</p>
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Response</p>
          <p className="text-xl lg:text-2xl font-bold text-cyan-300 mt-1">{Math.round(endpoint.avg_response_time || 0)}ms</p>
        </div>
      </div>

      {/* Last Checked */}
      <p className="text-xs text-slate-500 mb-3">
        Last checked: {endpoint.last_checked ? new Date(endpoint.last_checked).toLocaleString() : "Never"}
      </p>

      {/* Last Alert */}
      {lastAlert && (
        <div className={`mb-4 px-3 py-2 rounded-lg text-xs font-medium ${
          getSeverityStyle(lastAlert.severity).color === "#991b1b"
            ? "bg-red-500/20 border border-red-500/30 text-red-200"
            : "bg-amber-500/20 border border-amber-500/30 text-amber-200"
        }`}>
          Last Alert: {lastAlert.message} ({formatTimeDiff(lastAlert.timestamp)})
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(endpoint)}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 transition-all duration-200"
        >
          ✎ Edit
        </button>
        <button
          onClick={() => onDelete(endpoint.endpoint_id)}
          className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all duration-200"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
