# Deployment Guide — One Nation, One Athlete

This repository is a monorepo with:
- client/ (Vite + React)
- server/ (Express + TypeScript)

## Render (Backend API)
1) Create a new Web Service in Render from this repo.
   - Root directory: server
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Health check path: `/health`
2) Set environment variables (Dashboard > Environment):
   - NODE_ENV=production
   - MONGODB_URI=...
   - JWT_SECRET=...
   - FRONTEND_URL=https://your-onoa.vercel.app,https://*.vercel.app
   - BACKEND_URL=https://<your-render-service>.onrender.com
   - AWS_REGION=...
   - S3_BUCKET=...
   - AWS_ACCESS_KEY_ID=...
   - AWS_SECRET_ACCESS_KEY=...
   - OPENAI_API_KEY=... (optional)
3) Deploy. Verify health: https://<render-host>/health returns `{ ok: true }`.
4) Optional: Run seed once (Render Shell): `npm run seed`.

Note: CORS is configured to accept an explicit list (`FRONTEND_URL`, comma-separated), wildcard subdomain patterns via `*.domain`, and also allows Vercel preview domains (`.vercel.app`, `.vercel.dev`).

## Vercel (Frontend)
1) Create a new Vercel project from this repo.
   - Project Settings → General → Root Directory: `client`
   - Build Command: `npm run build` (auto)
   - Output Directory: `dist` (auto)
2) Environment Variables (Project Settings → Environment Variables):
   - VITE_API_BASE_URL=https://<your-render-service>.onrender.com
   - VITE_ENABLE_3D=true
   - VITE_APP_NAME=One Nation One Athlete
3) Redeploy. Confirm SPA routing works (vercel.json provides rewrites) and PWA installs.

## Verify
- Auth: Register, Login, role-based redirect
- Performance: Create a log, refresh chart; go offline and add, then reconnect to sync batch
- Injuries: Upload a file; confirm URL (S3 if configured, else `/uploads/...`)
- Messaging: Open Community → Messaging, join a conversationId and send/receive
- Admin: View Reports and Fairness charts
- 3D toggle and language switch on Landing

## Troubleshooting
- CORS: Ensure FRONTEND_URL includes the exact Vercel domain and optionally `https://*.vercel.app`.
- Socket.IO: Uses the same `VITE_API_BASE_URL`. Ensure HTTPS and correct origin.
- Uploads: Without S3, files are stored on the server’s ephemeral disk. Configure S3 for persistence.
- PWA: Service worker and manifest are in `client/public`. Clear caches when updating.
