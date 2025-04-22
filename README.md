# B44_WEB_060

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

The server will run at: `http://localhost:5000`

---

## 📬 API Overview

| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| POST   | `/api/auth/register`      | Register a new user              |
| POST   | `/api/auth/login`         | User login                       |
| POST   | `/api/auth/forgot-password` | Send password reset email       |
| POST   | `/api/auth/reset-password` | Reset user password              |
| POST   | `/api/alerts/notify`      | Send real-time email alert       |
| GET    | `/api/cases`              | Get all cases (based on role)    |
| POST   | `/api/cases`              | Submit a new case report         |
| PUT    | `/api/cases/:id`          | Update case (lawyer/admin)       |

> All sensitive routes are secured via JWT middleware.

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
