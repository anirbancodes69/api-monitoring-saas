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
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-md mx-4 bg-slate-800/40 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">🚀 APILENS</h1>
          <p className="text-sm text-slate-400 font-medium m-0">Real-time endpoint monitoring</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-in slide-in-from-top-2 duration-300">
            <p className="text-red-400 text-sm font-semibold m-0">❌ {error}</p>
          </div>
        )}

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin(e as any)}
            className={`w-full px-4 py-3 rounded-lg bg-slate-700/30 border-2 transition-all duration-300 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 ${
              errors.email ? "border-red-500/50 bg-red-500/5" : "border-slate-600/50"
            }`}
          />
          {errors.email && <p className="text-red-400 text-xs font-semibold mt-1.5 m-0">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin(e as any)}
              className={`w-full px-4 py-3 rounded-lg bg-slate-700/30 border-2 transition-all duration-300 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 ${
                errors.password ? "border-red-500/50 bg-red-500/5" : "border-slate-600/50"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bg-none border-none cursor-pointer text-lg p-1 text-slate-400 hover:text-slate-300 transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs font-semibold mt-1.5 m-0">{errors.password}</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="remember"
            className="cursor-pointer w-4 h-4 rounded accent-blue-400"
          />
          <label htmlFor="remember" className="cursor-pointer text-sm text-slate-400 hover:text-slate-300 transition-colors m-0">
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
            loading
              ? "bg-gradient-to-r from-blue-500/50 to-cyan-500/50 opacity-70 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 shadow-lg shadow-blue-500/20"
          }`}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-slate-400 m-0">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="text-blue-400 font-bold cursor-pointer hover:text-cyan-300 transition-colors">
            Create one
          </span>
        </p>
      </form>
    </div>
  );
}
