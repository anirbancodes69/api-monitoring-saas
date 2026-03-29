# 🚀 API Monitor SaaS

A scalable API monitoring system built with:

* 🧠 Laravel (Backend API + Jobs + Alerts)
* ⚡ React (Frontend Dashboard)
* 🐳 Docker (Full environment)

---

## 📦 Project Structure

```
api-monitor-saas/
├── src/              # Laravel Backend
├── frontend/         # React App (Vite)
├── docker/           # Docker configs
├── docker-compose.yml
```

---

## ⚙️ Tech Stack

* Laravel 13
* MySQL
* Redis (Queues)
* React + Vite + TypeScript
* Docker

---

## 🚀 Getting Started

### 1. Clone repo

```
git clone <repo-url>
cd api-monitor-saas
```

---

### 2. Start backend

```
docker-compose up -d app nginx mysql redis
```

Run migrations:

```
docker exec -it api_monitoring_app php artisan migrate
```

---

### 3. Start frontend

```
docker-compose up frontend
```

Open:

* Frontend → http://localhost:5173
* Backend → http://localhost:8000

---

## 🔐 Authentication Flow

* Login via `/api/login`
* Token stored in frontend (localStorage)
* API requests use `Authorization: Bearer <token>`

---

## ⚡ Features

* API uptime monitoring
* Background job processing (queues)
* Email alerts (failure + recovery)
* Dashboard (React)

---

## 🧠 Architecture

* Backend = API-first (Service + Jobs pattern)
* Frontend = SPA (React)
* Async processing via queues

---

## 📌 Future Roadmap

* Charts (uptime history)
* Multi-user SaaS support
* Billing integration
* Webhooks / Slack alerts

---

## 👨‍💻 Author

Anirban Bhowmick
