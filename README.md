# 🧪 Sample Logistics Backend API

A role-based backend API built with **Node.js**, **Express**, and **MongoDB** to manage medical sample logistics between hospitals and agents. It includes user authentication, sample scheduling, collection, delay reporting, and performance tracking.

## 🚀 Features

- **JWT Authentication**
- **Role-based Access Control (AGENT / HOSPITAL)**
- Sample scheduling & collection
- Delay reporting
- Agent performance analytics
- MongoDB with Mongoose models
- Modular MVC architecture

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- TypeScript
- JWT (JSON Web Tokens)
- Bcrypt (for password hashing)
- RESTful API Design

---

## 📁 Project Structure

```
src/
├── config/
│ └── db.ts
├── controllers/
│ ├── agent.controller.ts
│ ├── auth.controller.ts
│ └── sample.controller.ts
├── middlewares/
│ ├── authenticate.ts
│ └── role.ts
├── models/
│ ├── User.ts
│ ├── Sample.ts
│ └── DelayReport.ts
├── routes/
│ ├── agent.routes.ts
│ ├── auth.routes.ts
│ └── sample.routes.ts
├── server.ts

```


---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### 📦 Installation

```bash
git clone https://github.com/hacker2406/Agent-Sample-Collection-Automation.git
cd Agent-Sample-Collection-Automation
npm install

```

### Set up Environment Variables

Create a `.env` file in the directory with the following variables (example):

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start Server

```sh
npm run dev
```

# 🧪 Sample Logistics Backend - API Testing Documentation

## 🌐 Base URL

```
http://localhost:5000
```

---

## 🔐 Authentication Routes

### ✅ Register a User

**POST** `/auth/register`

#### Headers
```
Content-Type: application/json
```

#### Body (Hospital)
```json
{
  "name": "City Hospital",
  "email": "hospital@example.com",
  "password": "123456",
  "role": "hospital"
}
```

#### Body (Agent)
```json
{
  "name": "Ravi Agent",
  "email": "agent@example.com",
  "password": "123456",
  "role": "agent",
  "hospital": "<HospitalUserID>"
}
```

---

### 🔑 Login

**POST** `/auth/login`

#### Headers
```
Content-Type: application/json
```

#### Body
```json
{
  "email": "hospital@example.com",
  "password": "123456"
}
```

---

### 👤 Get My Profile

**GET** `/auth/me`

#### Headers
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🏥 Hospital Routes

### 📦 Schedule Sample Collection

**POST** `/samples`

#### Headers
```
Authorization: Bearer <JWT_TOKEN of Hospital>
Content-Type: application/json
```

#### Body
```json
{
  "agentId": "<AGENT_USER_ID>",
  "pickupTime": "2025-08-06T12:00:00Z",
  "pickupLocation": "Apollo Hospital, Block B",
  "patientInfo": {
    "name": "Raj Malhotra",
    "patientId": "P12345"
  }
}
```

---

### 🧪 View Samples Requested by Hospital

**GET** `/samples/hospital/me`

#### Headers
```
Authorization: Bearer <JWT_TOKEN of Hospital>
```

---

## 🚚 Agent Routes

### 🗓️ Get Today's Assigned Samples

**GET** `/samples/agent/me`

#### Headers
```
Authorization: Bearer <JWT_TOKEN of Agent>
```

---

### ✅ Mark Sample as Collected

**PUT** `/samples/:id/collect`

#### Headers
```
Authorization: Bearer <JWT_TOKEN of Agent>
Content-Type: application/json
```

#### Body
```json
{
  "collectionLocation": {
    "lat": 28.6139,
    "lng": 77.2090
  }
}
```

---

### ⏱️ Report Delay

**POST** `/samples/:id/delay`

#### Headers
```
Authorization: Bearer <JWT_TOKEN of Agent>
Content-Type: application/json
```

#### Body
```json
{
  "reason": "Vehicle breakdown",
  "newExpectedTime": "2025-08-06T15:00:00Z"
}
```

---

### 📊 Get Agent Performance

**GET** `/agents/:id/performance`

#### Headers
```
Authorization: Bearer <JWT_TOKEN of Agent>
```

> Replace `:id` with Agent's User ID (or use `/auth/me` to get the ID).

---

## 🛡️ Notes

- Use JWT token from `/auth/login` for protected endpoints.
- Agent registration requires `hospital` field (Hospital’s ObjectId).
- Date-time values must be in ISO format (e.g., `2025-08-06T12:00:00Z`).


---

## 🧠 Future Logic Improvements

The following enhancements can make the system more robust, scalable, and closer to real-world logistics use cases:

### 1. ✅ Agent Availability & Assignment Logic
- Assign samples only to available agents.
- Implement time-slot based scheduling and prevent overloading agents.
- Assign nearest available agent dynamically using geolocation and ETA.

### 2. 📍 Geofencing & Location Verification
- Ensure agent is within pickup radius before allowing collection.
- Alert hospital/admin if collection location deviates from expected route.

### 3. 🕓 SLA Management
- Define SLA (Service Level Agreement) time windows for pickup.
- Notify stakeholders before SLA breaches.
- Automatically escalate or reassign if SLA is about to be missed.

### 4. 📊 Agent Performance Scoring System
- Track average delay, punctuality, and completed pickups.
- Introduce weighted performance scoring & rankings.
- Incentivize top-performing agents.

### 5. 🔁 Reassignment & Routing
- Allow reassignment of samples to alternate agents in case of delays.
- Notify reassigned agent and hospital.

### 6. 📦 Sample Integrity Tracking
- Add fields to track sample condition (e.g., "damaged", "leaked", "expired").
- Allow agents/hospitals to report anomalies during collection.

### 7. 🧪 Multiple Samples Per Pickup
- Support batch scheduling (hospital schedules 5 samples at once).
- Add grouping logic for optimizing routes and minimizing travel time.

### 8. 🔐 Fine-Grained Access Control
- Hospitals should only see their scheduled and completed samples.
- Agents should only be able to update their assigned samples.
- Introduce admin role for complete access and analytics.

### 9. ⏱ Delay Classification
- Classify delays as:
  - Weather-based
  - Traffic-related
  - Agent-reported
  - System delays (e.g., app crashes)
- Use this for root-cause analysis.

### 10. 🗓 Schedule Prediction (Optional)
- Predict optimal pickup windows based on historical data.
- Recommend best time slots to hospitals.

---

These logical improvements can greatly enhance reliability, efficiency, and scalability of the system in real-world scenarios.





## 👤 Author

**Ratul Paul**

- [LinkedIn](https://www.linkedin.com/in/ratulpaul2002/)
- [GitHub](https://github.com/hacker2406)

## 📄 License

This project is for demonstration and educational purposes only. Feel free to use the code as a reference