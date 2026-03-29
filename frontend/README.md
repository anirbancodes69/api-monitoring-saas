# ⚛️ Frontend (React + Vite)

This is the frontend dashboard for API Monitor SaaS.

---

## ⚙️ Tech Stack

* React (TypeScript)
* Vite
* Fetch API (no heavy libs)

---

## 🚀 Run with Docker

From root:

```
docker-compose up frontend
```

App runs at:

```
http://localhost:5173
```

---

## 📁 Structure

```
src/
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
├── services/
│   └── api.ts
├── App.tsx
```

---

## 🔐 Authentication

* Login API → `/api/login`
* Token stored in `localStorage`
* Used in headers:

```
Authorization: Bearer <token>
```

---

## 🔌 API Integration

Base URL:

```
http://localhost:8000/api
```

---

## 🧪 Development Notes

* No state management library (simple for MVP)
* Minimal routing (React Router)
* Focus on functionality first

---

## 📌 Next Improvements

* Protected routes
* UI components (cards, sidebar)
* Error handling improvements
* Charts (Recharts)

---

## ⚠️ Important

Do NOT commit:

```
node_modules/
dist/
.env
```

---

## 👨‍💻 Author

Anirban Bhowmick
