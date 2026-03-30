import { useState, useEffect } from "react";
import { login } from "../services/api";
import { setToken, isAuthenticated } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      const data = await login(email, password);
      setToken(data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: "email" | "password", value: string) => {
    if (field === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div style={styles.container}>
      {/* Background decoration */}
      <div style={styles.decorCircle1}></div>
      <div style={styles.decorCircle2}></div>

      <form onSubmit={handleLogin} style={styles.formContainer}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🚀 API Monitor</h1>
          <p style={styles.subtitle}>Real-time endpoint monitoring</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={styles.errorAlert}>
            <p style={styles.errorText}>❌ {error}</p>
          </div>
        )}

        {/* Email Field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin(e as any)}
            style={{
              ...styles.input,
              borderColor: errors.email ? "#dc2626" : "#e5e7eb",
              backgroundColor: errors.email ? "#fef2f2" : "rgba(255,255,255,0.8)",
            }}
          />
          {errors.email && <p style={styles.errorMessage}>{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin(e as any)}
              style={{
                ...styles.input,
                borderColor: errors.password ? "#dc2626" : "#e5e7eb",
                backgroundColor: errors.password ? "#fef2f2" : "rgba(255,255,255,0.8)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password && <p style={styles.errorMessage}>{errors.password}</p>}
        </div>

        {/* Remember Me */}
        <div style={styles.rememberMe}>
          <input
            type="checkbox"
            id="remember"
            style={{ cursor: "pointer" }}
          />
          <label htmlFor="remember" style={{ cursor: "pointer", fontSize: 14, color: "#6b7280" }}>
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.loginBtn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={styles.spinner}></span>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Footer */}
        <p style={styles.footer}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Create one
          </span>
        </p>
      </form>
    </div>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  decorCircle1: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    top: -100,
    left: -100,
    backdropFilter: "blur(10px)",
  },

  decorCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    background: "rgba(255,255,255,0.05)",
    borderRadius: "50%",
    bottom: -50,
    right: -50,
    backdropFilter: "blur(10px)",
  },

  formContainer: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    padding: 40,
    borderRadius: 24,
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
    position: "relative",
    zIndex: 10,
  },

  header: {
    textAlign: "center" as const,
    marginBottom: 32,
  },

  title: {
    fontSize: 32,
    fontWeight: 800,
    color: "#1a202c",
    margin: 0,
    marginBottom: 8,
    letterSpacing: "-0.5px",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    margin: 0,
    fontWeight: 500,
  },

  errorAlert: {
    background: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    animation: "slideDown 0.3s ease",
  },

  errorText: {
    color: "#991b1b",
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
  },

  formGroup: {
    marginBottom: 20,
  },

  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "2px solid #e5e7eb",
    fontSize: 14,
    fontFamily: "inherit",
    transition: "all 0.3s ease",
    color: "#1a202c",
    boxSizing: "border-box" as const,
  },

  passwordWrapper: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },

  toggleButton: {
    position: "absolute" as const,
    right: 12,
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
    padding: 4,
  },

  errorMessage: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 6,
    margin: 0,
    fontWeight: 600,
  },

  rememberMe: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
    fontSize: 14,
  },

  loginBtn: {
    width: "100%",
    padding: "14px 16px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  spinner: {
    display: "inline-block",
    width: 14,
    height: 14,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },

  footer: {
    textAlign: "center" as const,
    marginTop: 20,
    fontSize: 14,
    color: "#6b7280",
    margin: "20px 0 0 0",
  },

  link: {
    color: "#667eea",
    fontWeight: 700,
    cursor: "pointer",
    transition: "color 0.2s ease",
    ":hover": {
      color: "#764ba2",
    },
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes slideDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  input:focus {
    outline: none;
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  button:active:not(:disabled) {
    transform: scale(0.98);
  }
  a {
    text-decoration: none;
  }
`;
if (!document.head.querySelector("[data-login-styles]")) {
  styleSheet.setAttribute("data-login-styles", "true");
  document.head.appendChild(styleSheet);
}