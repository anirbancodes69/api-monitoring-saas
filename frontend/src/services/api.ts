import { removeToken } from "../utils/auth";

const API_URL = "http://localhost:8000/api";

// 🔐 LOGIN
export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

// 📊 DASHBOARD
export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/dashboard`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    removeToken();
    window.location.href = "/";
    return [];
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch dashboard");
  }

  return data;
};

// ➕ ADD
export const addEndpoint = async (
  name: string,
  url: string,
  method = "GET",
  expected_status = 200,
  interval = 5
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/endpoints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      url,
      method,
      expected_status,
      interval,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to add endpoint");
  }

  return data;
};

// ✏️ UPDATE
export const updateEndpoint = async (id: number, payload: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/endpoints/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update endpoint");
  }

  return data;
};

// 🗑 DELETE
export const deleteEndpoint = async (id: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/endpoints/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete endpoint");
  }

  return true;
};