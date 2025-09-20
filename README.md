# One Nation, One Athlete — MERN Inclusive Platform

Phase 1 scaffold for a full-stack MERN application focused on fair, inclusive access for athletes, coaches, sponsors, and admins.

## Tech
- Frontend: React + Vite + TypeScript, TailwindCSS, Framer Motion, React Router, React Query, i18next (EN/HI/MR), react-three-fiber + drei (toggleable 3D with 2D fallbacks), PWA
- Backend: Node.js + Express + TypeScript, MongoDB (Mongoose), JWT + bcrypt, Multer + AWS S3, Socket.IO, OpenAI integration
- Analytics: Basic fairness distribution dashboard

## Structure
- client/ — Vite React app
- server/ — Express API with Socket.IO

## Env
Copy `.env.example` to `.env` and fill values. Client reads `VITE_` vars.

## Seed
`server/scripts/seed.ts` inserts demo users (athletes/coaches/sponsors/admin), scholarships, campaigns, messages, and performance logs.

## Tests
Jest + Supertest tests for auth and performance routes in `server/tests`.

## Screenshots
- screenshots/landing.png
- screenshots/dashboard.png

