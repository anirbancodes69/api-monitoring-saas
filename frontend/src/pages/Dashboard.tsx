import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setData(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      <h1>API Monitor Dashboard</h1>

      {Array.isArray(data) && data.map((endpoint: any) => (
        <div key={endpoint.id} style={{ marginBottom: 20 }}>
          <h3>{endpoint.name}</h3>
          <p>Status: {endpoint.status}</p>
          <p>
            Last Checked:{" "}
            {new Date(endpoint.last_checked).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}