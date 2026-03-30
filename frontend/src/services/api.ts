export const login = async (email: string, password: string) => {
  const res = await fetch("http://localhost:8000/api/auth/login", { // ✅ FIXED
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json", // 🔥 IMPORTANT
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/api/dashboard", {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`, // 🔥 IMPORTANT
    },
  });

  const data = await res.json();

  if (res.status === 401) {
  localStorage.removeItem("token");
  window.location.href = "/";
}

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch dashboard");
  }

  return data;
};