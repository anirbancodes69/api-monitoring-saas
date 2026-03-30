import { useEffect, useState } from "react";
import {
  getDashboard,
  addEndpoint,
  updateEndpoint,
  deleteEndpoint,
} from "../services/api";
import { removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    url: "",
    method: "GET",
    expected_status: "200",
    interval: "5",
  });

  const navigate = useNavigate();

  // 🔄 Fetch dashboard
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const res = await getDashboard();
      setData(res);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Form change
  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ➕ ADD
  const handleAdd = async () => {
    try {
      setAdding(true);

      await addEndpoint(
        form.name,
        form.url,
        form.method,
        Number(form.expected_status),
        Number(form.interval)
      );

      await fetchData();
      resetForm();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  // ✏️ EDIT (prefill)
  const handleEdit = (endpoint: any) => {
    setEditingId(endpoint.endpoint_id);

    setForm({
      name: endpoint.name,
      url: endpoint.url,
      method: "GET",
      expected_status: "200",
      interval: "5",
    });
  };

  // 🔄 UPDATE
  const handleUpdate = async () => {
    try {
      setAdding(true);

      await updateEndpoint(editingId!, {
        name: form.name,
        url: form.url,
        method: form.method,
        expected_status: Number(form.expected_status),
        interval: Number(form.interval),
      });

      await fetchData();
      setEditingId(null);
      resetForm();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this endpoint?")) return;

    try {
      await deleteEndpoint(id);
      await fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      url: "",
      method: "GET",
      expected_status: "200",
      interval: "5",
    });
  };

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  const getStatus = (endpoint: any) => {
    if (!endpoint.last_checked) return "UNKNOWN";
    return endpoint.status;
  };

  if (loading) return <div style={styles.loader}>Loading...</div>;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🚀 API Monitor</h1>

        <div>
          <p style={styles.refreshText}>
            {refreshing ? "Refreshing..." : "Auto-refresh every 60s"}
          </p>
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.formCard}>
        <h3>{editingId ? "Edit Endpoint" : "Add Endpoint"}</h3>

        <div style={styles.formGrid}>
          <input
            name="name"
            placeholder="API Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="url"
            placeholder="https://api.example.com"
            value={form.url}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="method"
            value={form.method}
            onChange={handleChange}
            style={styles.input}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>

          <input
            name="expected_status"
            type="number"
            value={form.expected_status}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="interval"
            type="number"
            value={form.interval}
            onChange={handleChange}
            style={styles.input}
          />

          <button
            onClick={editingId ? handleUpdate : handleAdd}
            style={styles.addBtn}
          >
            {adding
              ? "Processing..."
              : editingId
              ? "Update"
              : "Add Endpoint"}
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div style={styles.grid}>
        {data.map((endpoint: any) => {
          const status = getStatus(endpoint);

          return (
            <div key={endpoint.endpoint_id} style={styles.card}>
              <div style={styles.cardTop}>
                <h3>{endpoint.name}</h3>

                <span
                  style={{
                    ...styles.badge,
                    background:
                      status === "UP"
                        ? "#e6f9f0"
                        : status === "DOWN"
                        ? "#ffe6e6"
                        : "#eee",
                  }}
                >
                  {status}
                </span>
              </div>

              <p>Uptime: {endpoint.uptime_percentage}%</p>
              <p>
                Avg: {Math.round(endpoint.avg_response_time)} ms
              </p>

              <p style={styles.time}>
                {endpoint.last_checked
                  ? new Date(endpoint.last_checked).toLocaleString()
                  : "Not checked yet"}
              </p>

              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() => handleEdit(endpoint)}
                  style={styles.editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(endpoint.endpoint_id)
                  }
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 🎨 STYLES

const styles: any = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  title: { color: "#fff" },

  refreshText: { color: "#fff", fontSize: 12 },

  logout: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
  },

  formCard: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 10,
  },

  input: { padding: 10 },

  addBtn: {
    background: "#667eea",
    color: "#fff",
    border: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
  },

  badge: {
    padding: "4px 10px",
    borderRadius: 20,
  },

  time: { fontSize: 12 },

  editBtn: {
    marginRight: 10,
    background: "#ffc107",
    border: "none",
  },

  deleteBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
  },

  loader: { textAlign: "center", marginTop: 100 },
};