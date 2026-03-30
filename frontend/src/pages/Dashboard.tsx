import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { removeToken } from "../utils/auth";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboard();
      setData(res);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    removeToken();
    window.location.href = "/";
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleLogout}>Logout</button>

      <h1>API Monitor Dashboard</h1>

      {data.map((endpoint: any) => (
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