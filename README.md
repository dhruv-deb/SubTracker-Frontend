# SubTrack 🚀

A full-stack web application designed to help users track their recurring subscriptions and receive timely email reminders before payments are due. Never miss a renewal date again!

This project is built with a modern tech stack, featuring a **React (Vite)** frontend and a **Node.js (Express)** backend, connected to a **MongoDB** database. It is deployed with the frontend on **Vercel** and the backend on **Render**.

---

## 🌐 Live Demo

* **Frontend (Vercel):** [`sub-tracker-frontend-sandy.vercel.app`](sub-tracker-frontend-sandy.vercel.app)
* **Backend API (Render):** [`subscription-tracker-api-shas.onrender.com`](subscription-tracker-api-shas.onrender.com)

---

## ✨ Features

* **User Authentication:** Secure user registration and login system using JWT stored in secure, HTTP-only cookies.
* **Subscription Management:** A full suite of CRUD (Create, Read, Update, Delete) operations for managing subscriptions.
* **Dashboard Overview:** An intuitive dashboard that displays all upcoming subscription renewals within the next 7 or 30 days.
* **Automated Email Reminders:** Powered by a durable Upstash QStash workflow, the system automatically sends a confirmation email on creation, plus reminder emails 7, 5, 3, and 1 day before a subscription renews.
* **Interactive UI:** Users can view all their subscriptions, see their status (active, inactive, cancelled, expired), edit details in a pop-up modal, and toggle their active status.
* **Security:** Protected routes, secure cookie handling, and rate limiting/bot protection with Arcjet.

---

## 🛠️ Tech Stack

This project is separated into two main repositories: a frontend client and a backend server.

### 📦 Backend

* **Framework:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JWT (JSON Web Tokens) & bcrypt for password hashing
* **Scheduled Jobs:** Upstash QStash for durable, serverless task scheduling
* **Email Service:** Nodemailer
* **Security:** Arcjet for rate limiting and bot protection
* **Environment:** `dotenv` for environment variable management

### 🖥️ Frontend

* **Framework:** React 19 with Vite
* **Routing:** React Router
* **Styling:** SCSS with CSS Modules
* **HTTP Client:** Native Fetch API
* **State Management:** React Context API
* **Icons:** Lucide React

### ☁️ Deployment

* **Backend:** Deployed as a Web Service on **Render**.
* **Frontend:** Deployed on **Vercel**.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* pnpm (or npm/yarn)
* Git

## 1. Clone the Repositories

First, clone both the frontend and backend repositories to your local machine.

```bash
# Clone the backend repository
git clone https://github.com/dhruv-deb/subscription-tracker-API.git

# Clone the frontend repository
git clone https://github.com/dhruv-deb/SubTracker-Frontend.git
```

## 2. Backend Setup

Repository: (https://github.com/dhruv-deb/subscription-tracker-API.git)

 Navigate to the backend directory and install dependencies:
```bash
cd <backend-folder-name>
pnpm install
```</comment-tag> <suggestion>**Navigate to the backend directory and install dependencies:**
```

 **Create an environment file:** Create a new file named `.env.development.local` in the root of the backend folder and add the following variables. You must fill these in with your own keys and credentials.
```bash
# Server Port
PORT=5500
SERVER_URL="http://localhost:5500"

# MongoDB Connection String
DB_URI="your_mongodb_atlas_connection_string"

# JWT Secrets
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="7d"

# Arcjet Security Key (Optional)
ARCJET_KEY="your_arcjet_key"

# Upstash QStash Credentials (for email scheduling)
QSTASH_URL="https://qstash.upstash.io"</comment-tag> <suggestion>QSTASH_URL=https://qstash.upstash.io</suggestion> This is an important correction. Environment (`.env`) files should contain plain key-value pairs. Including quotes can sometimes cause parsing issues with certain libraries.
QSTASH_TOKEN="your_upstash_token"
QSTASH_CURRENT_SIGNING_KEY="your_upstash_signing_key"
QSTASH_NEXT_SIGNING_KEY="your_upstash_next_signing_key"

# Nodemailer (using Gmail)
EMAIL_PASSWORD="your_gmail_app_password"
```
**Start the server:**
```bash
pnpm run dev
```
   The backend API will now be running at `http://localhost:5500`.

## 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd <frontend-folder-name>
pnpm install
```
Start the development server:
```bash
pnpm run dev
```

The React application will now be running at `http://localhost:5173`. The frontend is already configured in `src/context/AuthContext.jsx` to connect to the local backend for development.
