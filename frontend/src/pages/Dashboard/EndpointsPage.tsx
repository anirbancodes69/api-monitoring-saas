import { EndpointForm } from "./EndpointForm";
import { EndpointsGrid } from "./EndpointsGrid";

interface Endpoint {
  endpoint_id: number;
  name: string;
  url: string;
  status: string;
  uptime_percentage: number;
  avg_response_time: number;
  last_checked: string;
}

interface EndpointsPageProps {
  data: Endpoint[];
  editingId: number | null;
  adding: boolean;
  form: {
    name: string;
    url: string;
    method: string;
    expected_status: string;
    interval: string;
  };
  alertHistory: any[];
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onAdd: () => Promise<void>;
  onUpdate: () => Promise<void>;
  onCancel: () => void;
  onEdit: (endpoint: any) => void;
  onDelete: (id: number) => void;
}

export function EndpointsPage({
  data,
  editingId,
  adding,
  form,
  alertHistory,
  onFormChange,
  onAdd,
  onUpdate,
  onCancel,
  onEdit,
  onDelete,
}: EndpointsPageProps) {
  return (
    <div>
      {/* Form Section */}
      <EndpointForm
        editingId={editingId}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onCancel={onCancel}
        loading={adding}
        form={form}
        onFormChange={onFormChange}
      />

      {/* Endpoints Grid Section */}
      <EndpointsGrid
        data={data}
        alertHistory={alertHistory}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
