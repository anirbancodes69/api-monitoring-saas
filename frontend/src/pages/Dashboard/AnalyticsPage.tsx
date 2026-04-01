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

interface AnalyticsPageProps {
  data: Endpoint[];
  analyticsData: AnalyticsData[];
  selectedEndpointAnalytics: number | null;
  onSelectEndpoint: (endpointId: number) => void;
}

export function AnalyticsPage({
  data,
  analyticsData,
  selectedEndpointAnalytics,
  onSelectEndpoint,
}: AnalyticsPageProps) {
  return (
    <div>
      <Analytics
        data={data}
        analyticsData={analyticsData}
        selectedEndpointAnalytics={selectedEndpointAnalytics}
        onSelectEndpoint={onSelectEndpoint}
      />
    </div>
  );
}
