# HabiTrack

This repository contains a MERN-style skeleton for HabiTrack.

Folders:
- `backend` — Express + Mongoose API
- `frontend` — Vite + React (Tailwind)

Quick start

1. Backend

```powershell
cd backend
npm install
# copy .env.example -> .env and set MONGO_URI
npm run dev
```

2. Frontend

```powershell
cd frontend
npm install
npm run dev
```

API
- `GET /api/habits` — list habits
- `POST /api/habits` — create habit
- `PUT /api/habits/:id/toggle` — toggle completion for date `{ date: 'YYYY-MM-DD' }`

