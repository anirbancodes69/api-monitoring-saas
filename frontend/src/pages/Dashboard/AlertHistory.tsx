import { getSeverityStyle, formatTimeDiff } from "./utils";

interface AlertHistoryItem {
  id: number;
  endpoint_id: number;
  endpoint_name: string;
  severity: string;
  message: string;
  timestamp: Date;
  status_change: string;
}

interface AlertHistoryProps {
  alertHistory: AlertHistoryItem[];
}

export function AlertHistory({ alertHistory }: AlertHistoryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
        🚨 Alert History
      </h2>

      {alertHistory.length === 0 ? (
        <p className="text-slate-400 text-center py-12 bg-slate-800/20 border border-slate-700/30 rounded-xl">
          No alerts yet. Your endpoints are looking good!
        </p>
      ) : (
        <div className="space-y-3">
          {alertHistory.slice(0, 10).map((alert) => {
            const severity = getSeverityStyle(alert.severity);
            const severityColor = alert.severity === "critical" 
              ? "bg-red-500/20 border-red-500/30 text-red-200" 
              : alert.severity === "warning"
              ? "bg-amber-500/20 border-amber-500/30 text-amber-200"
              : "bg-emerald-500/20 border-emerald-500/30 text-emerald-200";

            return (
              <div
                key={alert.id}
                className="group bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 hover:border-slate-600/50 rounded-xl p-4 lg:p-6 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-base lg:text-lg truncate">{alert.endpoint_name}</h4>
                    <p className="text-slate-400 text-sm mt-1">{alert.message}</p>
                  </div>
                  <span className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border ${severityColor}`}>
                    {severity.icon} {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {formatTimeDiff(alert.timestamp)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
