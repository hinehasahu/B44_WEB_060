# B44_WEB_060 Backend

# 🚨 Justigo Server

**Justigo Server** powers the backend of the **Justigo Crime Reporting and Tracking System**.  
Developed using **Node.js**, **Express**, and **MongoDB**, this RESTful API handles:

- 🔐 User Authentication (JWT-based)
- 📂 Case Management
- 📈 Crime Data Storage
- 🧑‍⚖️ Lawyer Feedback
- 📧 Real-time Email Alerts & Password Reset via NodeMailer

---

## 🏗️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: NodeMailer for password reset & alerts
- **Encryption**: bcrypt for password hashing

---

## 📁 Project Structure

```
justigo-server/
├── controllers/       # Logic for handling API requests
├── models/            # Mongoose schemas (User, Case, etc.)
├── routes/            # Express route handlers
├── middleware/        # Auth & role-based access control
├── utils/             # Utility functions (e.g., NodeMailer, AI mocks)
├── config/            # MongoDB connection, environment setup
├── .env               # Environment variables
└── index.js           # Server entry point
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/justigo-server.git
cd justigo-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=300 || 5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key (token)
JWT_SECRET_2=your_jwt_secret_key_2  (refreshToken)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:3000
```

> Replace `EMAIL_USER` and `EMAIL_PASS` with your email and app password (e.g., Gmail app-specific password).

### 4. Run the Server

```bash
npm run dev
```

The server will run at: `http://localhost:3000`

---


## 📬 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/api/user/signup` | Register a new user   |
| POST   | `/api/user/signin` | Login and get a token |

### 🚨 Crime Report Routes

| Method | Endpoint                         | Description                     |
| ------ | -------------------------------- | ------------------------------- |
| GET    | `/api/crimeReport/healthy`       | Health check                    |
| GET    | `/api/crimeReport/all`           | Get all crime reports (by role) |
| POST   | `/api/crimeReport/registerCrime` | Register a new crime            |
| PUT    | `/api/crimeReport/updateReport`  | Update progress of a crime case |

### 👁️ Witness Routes

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| GET    | `/api/witness/healthy`           | Health check             |
| GET    | `/api/witness/all/:id`           | Get witnesses for a case |
| POST   | `/api/witness/addWitness/:id`    | Add a witness to a case  |
| PUT    | `/api/witness/updateWitness/:id` | Update witness details   |
| DELETE | `/api/witness/deleteWitness/:id` | Delete witness from case |


---

## 🔒 Security Measures

- JWT authentication for protected routes
- Passwords securely hashed with bcrypt
- Role-based access (Citizen, Lawyer, Admin)
- Password reset via secure email link (expires after timeout)
- Environment variables to protect credentials

---

## 🛠️ Contribution

This project is actively maintained by a 3-member team. PRs are welcome as we iterate and scale.

---

## 📄 License

This project is licensed under the MIT License.
