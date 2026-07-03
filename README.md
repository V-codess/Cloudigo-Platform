
---

# Cloudigo Offers Control Panel

A full-stack application for managing offers on the Cloudigo platform.

**Stack:** Node.js · Express · Angular · MongoDB (with in-memory fallback)

---

## How to Run

### 1. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

---

### 2. Start the backend

```bash
cd backend
npm start
```

Runs on:

```
http://localhost:8080/api/offers/
```

---

### 3. Start the frontend

```bash
cd frontend
ng serve
```

Runs on:

```
http://localhost:4200
```

---

## API Base URL

Frontend connects to:

```
http://localhost:4200
```

---

## API Endpoints

### Get all offers

```
GET /api/offers
```

### Create offer

```
POST /api/offers
```

Example body:

```json
     {
        title: "50% Weekend Fashion Blast",
        description: "Exclusive weekend discount on premium fashion wear.",
        image: "https://images.pexels.com/photos/29906028/pexels-photo-29906028.jpeg",
        category: "fashion",
        merchantName: "Urban Wear Co",
        discount: 50,
        outlets: [
          "Valletta Shopping Centre",
          "Sliema Retail Hub"
        ],
        termsAndConditions:
          "Weekend only offer. Cannot be combined with other promotions.",
        availability: [
          "saturday",
          "sunday"
        ],
        status: "active",
        offerType: "premium",
        usageLimit: "week",
        startDate: new Date("2026-07-05"),
        endDate: new Date("2026-08-05")
      },
```

### Toggle offer status

```
PATCH /api/offers/:id/status
```

Switches between:

* active
* inactive

---

## 🧠 Database Setup

* Uses MongoDB via `URL` if provided
* Falls back to **in-memory MongoDB** if not set
* No local MongoDB installation required

Example `.env` (optional):

```env
PORT=8080
```

---

## Seed Data

If database is empty on startup, sample offers are automatically inserted so the UI is not empty.

Note: In-memory DB resets on restart.

---

## How to Use

1. Start backend
2. Start frontend
3. Open:

```
http://localhost:4200
```

4. You can:

* View offers
* Add new offers
* Toggle status (active/inactive)

---

## Assumptions

* Offer structure is inferred from consumer app UI
* “active/inactive” = live/paused state
* Categories are fixed enum set

---

## ▶️ Quick Start

```bash
cd backend && npm install && npm start
cd frontend && npm install && npm start
```

Open:

```
http://localhost:4200
```

---
