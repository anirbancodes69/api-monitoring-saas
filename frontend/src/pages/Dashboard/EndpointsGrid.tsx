import { styles } from "./styles";
import { EndpointCard } from "./EndpointCard";
import { EmptyState } from "./EmptyState";

interface EndpointsGridProps {
  data: any[];
  alertHistory: any[];
  onEdit: (endpoint: any) => void;
  onDelete: (id: number) => void;
}

export function EndpointsGrid({ data, alertHistory, onEdit, onDelete }: EndpointsGridProps) {
  const getLastAlert = (endpointId: number) => {
    return alertHistory.find((a) => a.endpoint_id === endpointId);
  };

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div style={styles.grid}>
      {data.map((endpoint: any) => (
        <EndpointCard
          key={endpoint.endpoint_id}
          endpoint={endpoint}
          lastAlert={getLastAlert(endpoint.endpoint_id)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
