Student Marketplace

A full-stack MERN project with Firebase Authentication. Backend is deployed on Render, frontend on Vercel.

🔹 Features

Firebase Google & Email/Password Authentication

JWT-based backend authentication

MongoDB database for storing users and marketplace data

Cloudinary image uploads

Responsive UI with Tailwind CSS

🔹 Tech Stack

Frontend: React, Tailwind CSS, Axios, Firebase Auth

Backend: Node.js, Express, MongoDB, Mongoose, Firebase Admin SDK

Deployment: Vercel (frontend), Render (backend)

🔹 Project Structure
StudentMarketplace/
├─ frontend/
│  ├─ src/
│  │  ├─ api/axios.js       # Axios instance
│  │  ├─ firebase.js        # Firebase config
│  │  └─ pages/Login.jsx
│  │  └─ pages/Signup.jsx
│  └─ .env                  # Frontend env variables
├─ backend/
│  ├─ models/User.js        # Mongoose user model
│  ├─ routes/auth.js        # Auth routes
│  ├─ server.js             # Entry point
│  └─ firebaseServiceKey.json # Firebase Admin SDK (gitignored!)
│  └─ .env                  # Backend env variables
🔹 Environment Variables
Backend (backend/.env)
PORT=3500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Make sure firebaseServiceKey.json is gitignored and not pushed to GitHub.

Frontend (frontend/.env)
VITE_API_URL=https://studentmarketplace-backend.onrender.com/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

Replace values with your Firebase project config.

🔹 Getting Started (Local Development)
Backend
cd backend
npm install
npm start
Frontend
cd frontend
npm install
npm run dev

Your frontend will now use the backend API at VITE_API_URL.

🔹 Deployment
Backend (Render)

Create a new Web Service on Render.

Connect your backend GitHub repo.

Set environment variables in Render Dashboard (MONGO_URI, JWT_SECRET).

Deploy.

Copy the deployed URL and use it in frontend .env as VITE_API_URL.

Frontend (Vercel)

Import your frontend GitHub repo into Vercel.

Add environment variables in Vercel (same as frontend .env).

Set VITE_API_URL to your Render backend URL + /api.

Deploy.

🔹 Firebase Integration

frontend/src/firebase.js handles Firebase config and Auth initialization.

backend/firebaseAdmin.js handles Firebase Admin SDK for token verification.

Backend routes verify Firebase tokens and generate JWT for client-side auth.


🔹 Usage

Signup/Login using Email & Password 

Authenticated API requests automatically attach JWT token.

Explore and add marketplace items.


🔹 Notes

Ensure .gitignore contains:

node_modules
.env
firebaseServiceKey.json

Never push secrets like firebaseServiceKey.json or .env to GitHub.