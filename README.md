
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
http://localhost:8080/api/offers
```

---

## API Endpoints

### Get all offers

```
GET /api/offers
```

**Query parameters:**

| Param | Default | Description |
|-------|---------|-------------|
| `page` | `1` | Page number (1-based) |
| `limit` | `6` | Items per page (max 50) |
| `status` | — | Filter by `active` or `inactive` |

**Example:**

```
GET /api/offers?page=1&limit=6&status=active
```

**Response includes pagination:**

```json
{
  "message": "Offers fetched successfully",
  "pagination": {
    "totalOffers": 10,
    "activeCount": 10,
    "inactiveCount": 0,
    "currentPage": 1,
    "totalPages": 2,
    "pageSize": 6
  },
  "data": [ /* offer objects */ ]
}
```

### Create offer

```
POST /api/offers
```

Example body:

```json
{
   "title":"New Weekend Fashion Blast",
   "description":"Exclusive weekend discount on premium fashion wear.",
   "image":"https://images.pexels.com/photos/29906028/pexels-photo-29906028.jpeg",
   "category":"fashion",
   "merchantName":"Urban Wear Co",
   "discount":50,
   "outlets":[
      "Valletta Shopping Centre",
      "Sliema Retail Hub"
   ],
   "termsAndConditions":"Weekend only offer. Cannot be combined with other promotions.",
   "availability":[
      "saturday",
      "sunday"
   ],
   "status":"active",
   "offerType":"premium",
   "usageLimit":"week",
   "startDate":"2026-07-05",
   "endDate":"2026-08-05"
}
```

**Required fields:** `title`, `description`, `category`, `merchantName`, `discount`, `outlets`, `termsAndConditions`, `offerType`, `startDate`, `endDate`, `availability` (at least one weekday).

**Optional fields:** `image`, `usageLimit`, `status` (defaults to `active`).

**Common errors:**

| Status | Message |
|--------|---------|
| `400` | Missing required fields, invalid category/type/dates, empty outlets, no availability days |
| `409` | Offer already exists (same title + merchant) |

### Toggle offer status

```
PATCH /api/offers/:id/status
```

**Body:**

```json
{ "status": "active" }
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
URL=mongodb://localhost:27017/cloudigo
```

If `URL` is omitted, an in-memory MongoDB instance is used automatically.

---

## Seed Data

On startup, **10 sample offers** are seeded automatically:

* If the database is empty, all seed offers are inserted.
* If some seed offers already exist (matched by title), only missing ones are added.
* Stale or broken image URLs (e.g. `example.com`) are repaired on restart.

Note: In-memory DB resets on restart, so seed runs again each time.

---

## How to Use

1. Start backend
2. Start frontend
3. Open:

```
http://localhost:4200
```

4. You can:

* View offers with pagination (6 per page)
* Filter by All / Live / Paused
* Add new offers (client + server validation)
* Upload an image or paste a URL
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

`String (optional — URL or base64 from file upload)`

Stores offer banner image. Optional in the API; cards show a placeholder when omitted.

---

### 7. Outlets

`Array of strings`

List of locations where the offer is valid.

**Reasoning:**
An offer may apply to multiple physical stores, so an array provides flexibility.

---

### 8. Availability

`Array of weekdays (required — at least one)`

Example: `["monday", "friday"]`

Valid values: `monday` … `sunday`. At least one day must be selected when creating an offer.

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

`Enum (optional): unlimited, once, twice, week, month, year`

When omitted, the UI displays “No usage limit”.

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
* Image handling supports URL, file upload (base64), or file path storage
* Outlet structure is simplified to strings instead of a relational model
* Category values are fixed based on observed UI filters

These decisions were made to balance simplicity and realism within the scope of the assignment.

---

## AI Tool Usage

AI tools were used as a development aid during this project.

### What I used AI for

- Troubleshooting Angular and TypeScript errors.
- Generating example seed data for testing.
- Improving the UI with suggestions for styling and layout.
- Reviewing and refining parts of the README documentation.
- Suggesting alternative implementations for Angular components and templates.

### What it produced

The AI generated:
- Sample MongoDB seed data.
- Suggestions for Angular templates and component logic.
- CSS styling ideas.
- Debugging suggestions for Angular configuration issues.
- Initial drafts of documentation sections.

### What changes I made and why

All AI-generated code and text were reviewed before being added to the project. I modified outputs to:
- Match the project's existing architecture and coding style.
- Use the application's actual MongoDB schema and API.
- Simplify implementations where appropriate.
- Remove unnecessary code and adjust naming conventions.
- Correct category values and validation rules to match the backend schema.

### AI Tools Used

ChatGPT – Used for debugging Angular and TypeScript issues, generating example seed data, suggesting UI improvements, and reviewing documentation.
Cursor AI – Used for code completion, refactoring suggestions, boilerplate generation, and improving development productivity.

All submitted code was reviewed, understood, and tested before inclusion in the project.

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
