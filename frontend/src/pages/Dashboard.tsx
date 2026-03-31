import { useEffect, useState, useRef } from "react";
import {
  getDashboard,
  getEndpoint,
  addEndpoint,
  updateEndpoint,
  deleteEndpoint,
} from "../services/api";
import { removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { ToastAlerts } from "./Dashboard/ToastAlerts";
import { Header } from "./Dashboard/Header";
import { EndpointForm } from "./Dashboard/EndpointForm";
import { AlertHistory } from "./Dashboard/AlertHistory";
import { Analytics } from "./Dashboard/Analytics";
import { EndpointsGrid } from "./Dashboard/EndpointsGrid";
import { Loader } from "./Dashboard/Loader";
import { styles, injectStyles } from "./Dashboard/styles";
import { generateTimeSeriesData } from "./Dashboard/utils";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [alerts, setAlerts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);

  // 🚨 ALERT HISTORY STATE
  const [alertHistory, setAlertHistory] = useState<any[]>([
    // Simulated initial data
    { id: 1, endpoint_id: 1, endpoint_name: "API Gateway", severity: "critical", message: "Endpoint went DOWN", timestamp: new Date(Date.now() - 8 * 60000), status_change: "DOWN" },
    { id: 2, endpoint_id: 2, endpoint_name: "Auth Service", severity: "warning", message: "Slow response time detected", timestamp: new Date(Date.now() - 15 * 60000), status_change: "SLOW" },
    { id: 3, endpoint_id: 1, endpoint_name: "API Gateway", severity: "success", message: "Endpoint recovered", timestamp: new Date(Date.now() - 20 * 60000), status_change: "UP" },
    { id: 4, endpoint_id: 3, endpoint_name: "Payment Service", severity: "critical", message: "Multiple failed requests", timestamp: new Date(Date.now() - 35 * 60000), status_change: "DOWN" },
  ]);

  // 📈 ANALYTICS TIME-SERIES DATA STATE
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [selectedEndpointAnalytics, setSelectedEndpointAnalytics] = useState<number | null>(null);

  const previousData = useRef<any[]>([]);
  const isFirstLoad = useRef(true);

  const [form, setForm] = useState({
    name: "",
    url: "",
    method: "GET",
    expected_status: "200",
    interval: "5",
  });

  const navigate = useNavigate();

  // Inject styles on mount
  useEffect(() => {
    injectStyles();
  }, []);

  // 🔄 FETCH + ALERT DETECTION
  const fetchData = async () => {
    const newData = await getDashboard();

    if (!isFirstLoad.current) {
      detectChanges(previousData.current, newData);
    } else {
      isFirstLoad.current = false;
    }
    previousData.current = [...newData];

    setData(newData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const i = setInterval(fetchData, 60000);
    return () => clearInterval(i);
  }, []);

  // 🚨 ALERT SYSTEM (CLEAN + AUTO REMOVE)
  const detectChanges = (oldData: any[], newData: any[]) => {
    if (!oldData || oldData.length === 0) return;

    newData.forEach((item) => {
      if (!item?.endpoint_id || !item?.name) return;

      const old = oldData.find((o) => o?.endpoint_id === item.endpoint_id);
      if (!old) return;

      if (old.status !== item.status) {
        const isDown = item.status === "DOWN";
        const text = isDown
          ? `${item.name} - Endpoint is DOWN`
          : `${item.name} - Endpoint recovered`;

        const alertType: "success" | "error" = isDown ? "error" : "success";
        const severity = isDown ? "critical" : "success";
        const alert = { id: Date.now() + Math.random(), text, type: alertType };

        // Add to toast alerts
        setAlerts((prev) => [alert, ...prev]);
        setTimeout(() => {
          setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
        }, 5000);

        // Add to alert history
        const historyEntry = {
          id: Date.now() + Math.random(),
          endpoint_id: item.endpoint_id,
          endpoint_name: item.name,
          severity,
          message: isDown ? "Endpoint went DOWN" : "Endpoint recovered",
          timestamp: new Date(),
          status_change: item.status,
        };
        setAlertHistory((prev) => [historyEntry, ...prev]);
      }
    });
  };

  // FORM HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      url: "",
      method: "GET",
      expected_status: "200",
      interval: "5",
    });
  };

  const handleAdd = async () => {
    setAdding(true);
    try {
      await addEndpoint(
        form.name.trim(),
        form.url.trim(),
        form.method,
        Number(form.expected_status),
        Number(form.interval)
      );
      await fetchData();
      resetForm();
      addAlert("Endpoint added successfully", "success");
    } catch (error) {
      addAlert("Failed to add endpoint", "error");
    }
    setAdding(false);
  };

  const handleEdit = async (e: any) => {
    setEditingId(e.endpoint_id);
    
    try {
      // Fetch full endpoint details to get method, expected_status, interval
      const endpoint = await getEndpoint(e.endpoint_id);
      setForm({
        name: endpoint.name || "",
        url: endpoint.url || "",
        method: endpoint.method || "GET",
        expected_status: String(endpoint.expected_status || "200"),
        interval: String(endpoint.interval || "5"),
      });
    } catch (error) {
      // Fallback to available data if fetch fails
      setForm({
        name: e.name || "",
        url: e.url || "",
        method: "GET",
        expected_status: "200",
        interval: "5",
      });
    }
  };

  const handleUpdate = async () => {
    setAdding(true);
    try {
      await updateEndpoint(editingId!, {
        name: form.name.trim(),
        url: form.url.trim(),
        method: form.method,
        expected_status: Number(form.expected_status),
        interval: Number(form.interval),
      });
      await fetchData();
      resetForm();
      addAlert("Endpoint updated successfully", "success");
    } catch (error) {
      addAlert("Failed to update endpoint", "error");
    }
    setAdding(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this endpoint? This action cannot be undone.")) return;
    try {
      await deleteEndpoint(id);
      await fetchData();
      addAlert("Endpoint deleted successfully", "success");
    } catch (error) {
      addAlert("Failed to delete endpoint", "error");
    }
  };

  const addAlert = (text: string, alertType: "success" | "error") => {
    const alert = { id: Date.now() + Math.random(), text, type: alertType };
    setAlerts((prev) => [alert, ...prev]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
    }, 4000);
  };

  // Initialize analytics data on component mount
  useEffect(() => {
    const initialData = generateTimeSeriesData();
    setAnalyticsData(initialData);
    if (data.length > 0) {
      setSelectedEndpointAnalytics(data[0].endpoint_id);
    }
  }, [data]);

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  if (loading) return <Loader />;

  return (
    <div style={styles.page}>
      <ToastAlerts alerts={alerts} />
      <Header onLogout={handleLogout} />
      <EndpointForm
        editingId={editingId}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancel={resetForm}
        loading={adding}
        form={form}
        onFormChange={handleChange}
        onEdit={handleEdit}
      />
      <AlertHistory alertHistory={alertHistory} />
      <Analytics
        data={data}
        analyticsData={analyticsData}
        selectedEndpointAnalytics={selectedEndpointAnalytics}
        onSelectEndpoint={setSelectedEndpointAnalytics}
      />
      <EndpointsGrid
        data={data}
        alertHistory={alertHistory}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}