import { useState } from "react";

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
    <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-6 mb-8 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        {editingId ? "📝 Edit Endpoint" : "➕ Add New Endpoint"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* API Name */}
        <div className="sm:col-span-1">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="API Name"
            className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-700/40 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              formErrors.name
                ? "border-red-500/50 bg-red-500/10 text-red-200"
                : "border-slate-600/50 text-slate-300 placeholder-slate-500"
            }`}
          />
          {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
        </div>

        {/* URL */}
        <div className="sm:col-span-1 lg:col-span-2">
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://api.example.com/health"
            className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-700/40 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              formErrors.url
                ? "border-red-500/50 bg-red-500/10 text-red-200"
                : "border-slate-600/50 text-slate-300 placeholder-slate-500"
            }`}
          />
          {formErrors.url && <p className="text-red-400 text-xs mt-1">{formErrors.url}</p>}
        </div>

        {/* Method */}
        <div className="sm:col-span-1">
          <select
            name="method"
            value={form.method}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-700/40 border border-slate-600/50 text-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>PATCH</option>
          </select>
        </div>

        {/* Expected Status */}
        <div className="sm:col-span-1">
          <input
            name="expected_status"
            value={form.expected_status}
            onChange={handleChange}
            placeholder="Status (e.g., 200)"
            className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-700/40 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              formErrors.expected_status
                ? "border-red-500/50 bg-red-500/10 text-red-200"
                : "border-slate-600/50 text-slate-300 placeholder-slate-500"
            }`}
          />
          {formErrors.expected_status && <p className="text-red-400 text-xs mt-1">{formErrors.expected_status}</p>}
        </div>

        {/* Interval */}
        <div className="sm:col-span-1">
          <input
            name="interval"
            value={form.interval}
            onChange={handleChange}
            placeholder="Interval (min)"
            className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-slate-700/40 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              formErrors.interval
                ? "border-red-500/50 bg-red-500/10 text-red-200"
                : "border-slate-600/50 text-slate-300 placeholder-slate-500"
            }`}
          />
          {formErrors.interval && <p className="text-red-400 text-xs mt-1">{formErrors.interval}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
            loading
              ? "bg-blue-400/40 text-blue-200 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30"
          }`}
        >
          {loading ? "Processing..." : editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm bg-slate-700/40 border border-slate-600/50 text-slate-300 hover:bg-slate-700/60 transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
