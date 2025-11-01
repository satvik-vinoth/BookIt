# Highway Delite – Experience Booking Platform

A full-stack web application that allows users to discover, explore, and book curated travel experiences with live availability, promo code validation, and booking confirmation.

## Overview
 - Highway Delite provides a smooth and modern experience booking interface — featuring:
 - Real-time experience listing from MongoDB.
 - Date & time slot selection for each experience.
 - Live seat availability tracking.
 - Promo code validation (flat & percentage discounts).
 - Full checkout flow with booking confirmation.
 - Responsive and mobile-friendly UI built with Next.js + Tailwind CSS.

## Tech Stack

**Frontend**  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

**Other Tools**  
![UUID](https://img.shields.io/badge/UUID-6E40C9?style=for-the-badge)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge)
![RESTful API](https://img.shields.io/badge/RESTful_API-005571?style=for-the-badge)

## 📁 Folder Structure

```
BookIt
├── backend/
├── config/
│   │   ├── db.js
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Experience.js
│   │   └── Promo.js
│   ├── routes/
│   │   ├── bookings.js
│   │   ├── experiences.js
│   │   └── promo.js
│   ├── server.js
|   ├── seed.js
│   └── package.json
|   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── experience/[id]/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── result/page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── Loader.tsx
│   ├── lib/api.ts
│   ├── public/
│   │   └── logo.jpg
│   └── package.json
|   └── .env.local
│
|
└── README.md
```

## Environment Variables

Create a file named .env in both your backend and frontend directories.

### Backend .env

```
PORT=5000
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/highway
```

### Frontend .env.local

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Setup and Run Instructions

### 1. Clone the Repository
```
git clone https://github.com/<your-username>/highway-delite-booking.git
cd highway-delite-booking
```

### 2. Setup Backend
```
cd backend
npm install
```

### 3.Create .env file

### 4. Run the Backend Server
```
npm run dev
```

Your backend will start on:
```
http://localhost:5000
```

### 5. Setup Frontend
```
cd ../frontend
npm install
```
### 6.Create .env.local file

### 7. Run the Frontend App
```
npm run dev
```

Frontend will start on:
```
http://localhost:3000
```

## Promo Code Logic

| Code Example | Type    | Description                      |
| ------------ | ------- | -------------------------------- |
| `FLAT100`    | Flat    | Subtracts ₹100 from total        |
| `SAVE10`     | Percent | Applies 10% discount on subtotal |

## Pages Overview

| Page               | Description                                               |
| ------------------ | --------------------------------------------------------- |
| `/`                | Lists all experiences with search functionality           |
| `/experience/[id]` | Displays experience details and available slots           |
| `/checkout`        | Handles user input, promo validation, and booking summary |
| `/result`          | Displays booking confirmation with Ref ID                 |


