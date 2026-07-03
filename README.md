
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

## Database Setup

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

## Data Model Decisions

The Offer schema was designed based on observing the consumer-facing Cloudigo app. Since internal business rules were not provided, several assumptions were made to model real-world offer behavior.

---

### 1. Title

`String (required)`

Used as the primary identifier of an offer in listing views.

**Reasoning:**
Consumer apps always display a short headline for each offer card. This is the most visible field.

---

### 2. Description

`String (required)`

Detailed marketing text explaining the offer.

**Reasoning:**
Used to give context to users beyond the title, similar to standard ecommerce or deal platforms.

---

### 3. Category

`Enum (required)`

Examples: fashion, food_drink, travel, etc.

**Reasoning:**
Categories are fixed for filtering and navigation in consumer apps. Using an enum ensures consistency and prevents invalid categories.

---

### 4. Merchant Name

`String (required)`

Name of the business providing the offer.

**Reasoning:**
Each offer must be associated with a visible merchant for trust and branding purposes.

---

### 5. Discount

`Number (0–100)`

Represents percentage discount.

**Reasoning:**
Consumer apps typically display discounts as percentages rather than absolute values for clarity and standardization.

---

### 6. Image

`String (URL or file path)`

Stores offer banner image.

**Reasoning:**
Images are required for visual engagement in consumer apps. Stored as URL/path instead of binary for scalability.

---

### 7. Outlets

`Array of strings`

List of locations where the offer is valid.

**Reasoning:**
An offer may apply to multiple physical stores, so an array provides flexibility.

---

### 8. Availability

`Array of weekdays`

Example: ["monday", "friday"]

**Reasoning:**
Offers may only be valid on certain days. Array allows multiple selections and supports scheduling logic.

---

### 9. Status

`Enum: active | inactive`

Represents whether the offer is live.

**Reasoning:**
A simple binary state is sufficient for this system to toggle visibility without deleting data.

---

### 10. Offer Type

`Enum: basic | premium`

**Reasoning:**
Assumed internal tiering system where premium offers may have higher visibility or priority.

---

### 11. Usage Limit

`Enum: once | weekly | monthly | unlimited`

**Reasoning:**
Prevents abuse and models real-world promotional constraints.

---

### 12. Start Date / End Date

`Date`

Defines offer validity period.

**Reasoning:**
Most promotional campaigns are time-bound and automatically expire.

---

# Assumptions & Ambiguity Handling

Since the Cloudigo consumer app was the only reference, several assumptions were made:

* Offers are modeled as marketing cards shown to end users
* Status is simplified to active/inactive instead of multiple lifecycle states
* Availability is represented as weekdays instead of time slots
* Image handling is simplified to URL/file path storage
* Outlet structure is simplified to strings instead of a relational model
* Category values are fixed based on observed UI filters

These decisions were made to balance simplicity and realism within the scope of the assignment.

---

# Important Note

If any assumption differs from internal system design, it is acknowledged that this is a simplified implementation based on observed consumer behavior only.

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
