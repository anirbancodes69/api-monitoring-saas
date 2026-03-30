import { useState, useEffect } from "react";
import { login } from "../services/api";
import { setToken, isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const data = await login(email, password);

      setToken(data.token);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea, #764ba2)"
    }}>
      <div style={{
        background: "#fff",
        padding: 30,
        borderRadius: 12,
        width: 350
      }}>
        <h2 style={{ textAlign: "center" }}>🚀 API Monitor</h2>

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 10 }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            background: "#667eea",
            color: "#fff",
            border: "none"
          }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </div>
    </div>
  );
}