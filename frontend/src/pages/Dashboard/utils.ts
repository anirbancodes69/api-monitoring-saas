// Utility functions for Dashboard
export const statusColor = (status: string) => {
  if (status === "UP") return { bg: "#d1fae5", color: "#047857", icon: "✓" };
  if (status === "DOWN") return { bg: "#fee2e2", color: "#991b1b", icon: "⚠️" };
  return { bg: "#f1f5f9", color: "#475569", icon: "?" };
};

export const getSeverityStyle = (severity: string) => {
  if (severity === "critical") return { bg: "#fee2e2", color: "#991b1b", icon: "🔴" };
  if (severity === "warning") return { bg: "#fef3c7", color: "#92400e", icon: "🟡" };
  return { bg: "#d1fae5", color: "#047857", icon: "🟢" };
};

export const formatTimeDiff = (date: any) => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const generateTimeSeriesData = () => {
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
