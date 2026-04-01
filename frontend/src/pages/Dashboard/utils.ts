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

/**
 * Convert UTC timestamp to IST (UTC+5:30) local time
 */
const convertToIST = (utcDateString: string): Date => {
  const utcDate = new Date(utcDateString);
  // Add 5.5 hours (5 hours 30 minutes) for IST
  const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
  return istDate;
};

/**
 * Convert API logs to chart data format + overall stats
 * Groups logs by 15-minute intervals for chart visualization
 * Calculates overall uptime and response time matching Endpoints Tab
 */
export const convertLogsToChartData = (logs: any[]) => {
  if (!logs || logs.length === 0) {
    return {
      chartData: generateTimeSeriesData(),
      stats: {
        avgResponse: 0,
        minResponse: 0,
        maxResponse: 0,
        avgUptime: "0.00",
      },
    };
  }

  // Calculate overall stats (matching Endpoints Tab calculation)
  const totalLogs = logs.length;
  
  // Check for both 'success' and 'UP' status values
  const successCount = logs.filter(
    (log) => log.status === "success" || log.status === "UP"
  ).length;
  
  const responseTimes = logs
    .map((log) => log.response_time || 0)
    .filter((time) => time > 0);
  
  const avgResponse = responseTimes.length
    ? Math.round(
        responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
      )
    : 0;
  
  const minResponse = responseTimes.length ? Math.round(Math.min(...responseTimes)) : 0;
  const maxResponse = responseTimes.length ? Math.round(Math.max(...responseTimes)) : 0;
  
  const avgUptime = totalLogs > 0
    ? (Math.round((successCount / totalLogs) * 10000) / 100).toFixed(2)
    : "0.00";

  // Group logs by 15-minute intervals
  const grouped: Record<string, any[]> = {};

  logs.forEach((log) => {
    // Convert UTC timestamp to IST (UTC+5:30)
    const istDate = convertToIST(log.checked_at);
    
    // Get IST time components
    const hours = istDate.getHours().toString().padStart(2, "0");
    const minutes = istDate.getMinutes();
    
    // Round down to nearest 15-minute interval (0, 15, 30, 45)
    const interval = Math.floor(minutes / 15) * 15;
    const intervalStr = interval.toString().padStart(2, "0");
    const key = `${hours}:${intervalStr}`;

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(log);
  });

  // Generate all 24-hour × 4 intervals = 96 time slots
  const allTimeSlots: Record<string, any[]> = {};
  for (let hour = 0; hour < 24; hour++) {
    for (let interval = 0; interval < 60; interval += 15) {
      const hourStr = hour.toString().padStart(2, "0");
      const intervalStr = interval.toString().padStart(2, "0");
      const key = `${hourStr}:${intervalStr}`;
      allTimeSlots[key] = grouped[key] || [];
    }
  }

  // Convert grouped data to chart format
  const chartData = Object.entries(allTimeSlots)
    .map(([time, logsForInterval]) => {
      let intervalAvgResponseTime = 0;
      let intervalUptime = 0;

      if (logsForInterval.length > 0) {
        const intervalResponseTimes = logsForInterval
          .map((log) => log.response_time || 0)
          .filter((time) => time > 0);
        
        intervalAvgResponseTime = intervalResponseTimes.length
          ? Math.round(
              intervalResponseTimes.reduce((sum, time) => sum + time, 0) /
                intervalResponseTimes.length
            )
          : 0;

        // Calculate uptime for this interval (check for both status values)
        const intervalSuccessCount = logsForInterval.filter(
          (log) => log.status === "success" || log.status === "UP"
        ).length;
        intervalUptime = Math.round(
          (intervalSuccessCount / logsForInterval.length) * 100 * 100
        ) / 100;
      }

      return {
        time,
        responseTime: intervalAvgResponseTime,
        uptime: intervalUptime,
        hour: parseInt(time.split(":")[0]),
      };
    });

  return {
    chartData,
    stats: {
      avgResponse,
      minResponse,
      maxResponse,
      avgUptime,
    },
  };
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
