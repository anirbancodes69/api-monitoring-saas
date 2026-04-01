import { Analytics } from "./Analytics";

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

interface AnalyticsPageProps {
  data: Endpoint[];
  analyticsData: AnalyticsData[];
  analyticsStats: AnalyticsStats;
  selectedEndpointAnalytics: number | null;
  onSelectEndpoint: (endpointId: number) => void;
}

export function AnalyticsPage({
  data,
  analyticsData,
  analyticsStats,
  selectedEndpointAnalytics,
  onSelectEndpoint,
}: AnalyticsPageProps) {
  return (
    <div>
      <Analytics
        data={data}
        analyticsData={analyticsData}
        analyticsStats={analyticsStats}
        selectedEndpointAnalytics={selectedEndpointAnalytics}
        onSelectEndpoint={onSelectEndpoint}
      />
    </div>
  );
}
