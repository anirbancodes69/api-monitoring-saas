interface Alert {
  id: number;
  text: string;
  type: "success" | "error";
}

interface ToastAlertsProps {
  alerts: Alert[];
}

export function ToastAlerts({ alerts }: ToastAlertsProps) {
  return (
    <div className="fixed bottom-6 right-6 lg:top-6 lg:right-6 z-50 space-y-3 pointer-events-none max-w-sm">
      {alerts.map((a) => (
        <div
          key={a.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-md border animate-in fade-in slide-in-from-right-4 duration-300 pointer-events-auto text-sm ${
            a.type === "error"
              ? "bg-red-500/20 border-red-500/50 text-red-200"
              : "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
          }`}
        >
          <span className="text-lg flex-shrink-0">
            {a.type === "error" ? "❌" : "✓"}
          </span>
          <p className="font-medium line-clamp-2">{a.text}</p>
        </div>
      ))}
    </div>
  );
}
