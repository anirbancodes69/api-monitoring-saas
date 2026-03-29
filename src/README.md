# 🧠 Backend (Laravel API)

This is the backend for API Monitor SaaS.

---

## ⚙️ Tech Stack

* Laravel 13
* MySQL
* Redis (Queues)
* Mailtrap (Email testing)

---

## 🚀 Run with Docker

From root:

```
docker-compose up -d app nginx mysql redis
```

---

## 🔌 API Endpoints

### Auth

```
POST /api/register
POST /api/login
```

---

### Dashboard

```
GET /api/dashboard
Authorization: Bearer <token>
```

---

### Endpoints

```
POST /api/endpoints
GET  /api/endpoints
```

---

## ⚡ Core Features

* API health monitoring
* Scheduled checks
* Queue-based processing
* Email alerts:

  * Failure alert 🚨
  * Recovery alert ✅

---

## 🧱 Architecture

* Controllers → thin layer
* Services → business logic
* Jobs → async processing
* Models → DB layer

---

## 🧵 Queue System

Run worker:

```
php artisan queue:work
```

Queue driver:

```
redis
```

---

## 📧 Mail Setup

Using Mailtrap:

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=...
MAIL_PASSWORD=...
```

---

## 🧠 Monitoring Flow

1. Scheduler triggers job
2. Job hits API endpoint
3. Logs response
4. Detects status change
5. Sends alert

---

## 📌 Future Improvements

* Retry logic
* Webhook alerts
* Multi-tenant SaaS
* Rate limiting

---

## 👨‍💻 Author

Anirban Bhowmick
