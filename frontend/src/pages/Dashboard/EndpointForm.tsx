import { useState } from "react";
import { styles } from "./styles";

interface FormState {
  name: string;
  url: string;
  method: string;
  expected_status: string;
  interval: string;
}

interface EndpointFormProps {
  editingId: number | null;
  onAdd: () => Promise<void>;
  onUpdate: () => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  form: FormState;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onEdit: (endpoint: any) => Promise<void>;
}

export function EndpointForm({
  editingId,
  onAdd,
  onUpdate,
  onCancel,
  loading,
  form,
  onFormChange,
}: EndpointFormProps) {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!form.name.trim()) errors.name = "API Name is required";
    if (!form.url.trim()) errors.url = "URL is required";
    if (!/^https?:\/\/.+/.test(form.url)) errors.url = "URL must start with http:// or https://";
    if (!/^\d+$/.test(form.interval) || Number(form.interval) < 1) errors.interval = "Interval must be at least 1 minute";
    if (!/^\d+$/.test(form.expected_status)) errors.expected_status = "Status must be a number";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (editingId) {
      await onUpdate();
    } else {
      await onAdd();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    onFormChange(e);
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  return (
    <div style={styles.formCard}>
      <h3 style={styles.formTitle}>
        {editingId ? "📝 Edit Endpoint" : "➕ Add New Endpoint"}
      </h3>

      <div style={styles.formGrid}>
        <div style={styles.formGroup}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="API Name"
            style={{
              ...styles.input,
              borderColor: formErrors.name ? "#dc2626" : "#e5e7eb",
              backgroundColor: formErrors.name ? "#fef2f2" : "#fff",
            }}
          />
          {formErrors.name && <p style={styles.error}>{formErrors.name}</p>}
        </div>

        <div style={styles.formGroup}>
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://api.example.com/health"
            style={{
              ...styles.input,
              borderColor: formErrors.url ? "#dc2626" : "#e5e7eb",
              backgroundColor: formErrors.url ? "#fef2f2" : "#fff",
            }}
          />
          {formErrors.url && <p style={styles.error}>{formErrors.url}</p>}
        </div>

        <div style={styles.formGroup}>
          <select name="method" value={form.method} onChange={handleChange} style={styles.input}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>PATCH</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <input
            name="expected_status"
            value={form.expected_status}
            onChange={handleChange}
            placeholder="Expected Status (e.g., 200)"
            style={{
              ...styles.input,
              borderColor: formErrors.expected_status ? "#dc2626" : "#e5e7eb",
              backgroundColor: formErrors.expected_status ? "#fef2f2" : "#fff",
            }}
          />
          {formErrors.expected_status && <p style={styles.error}>{formErrors.expected_status}</p>}
        </div>

        <div style={styles.formGroup}>
          <input
            name="interval"
            value={form.interval}
            onChange={handleChange}
            placeholder="Interval (minutes, min 1)"
            style={{
              ...styles.input,
              borderColor: formErrors.interval ? "#dc2626" : "#e5e7eb",
              backgroundColor: formErrors.interval ? "#fef2f2" : "#fff",
            }}
          />
          {formErrors.interval && <p style={styles.error}>{formErrors.interval}</p>}
        </div>

        <div style={styles.buttonGroup}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              ...styles.primaryBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Processing..." : editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button onClick={onCancel} disabled={loading} style={styles.secondaryBtn}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
