import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { buildApp } from './app';
import { initSockets } from './sockets/index';

dotenv.config();

const app = buildApp();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: (process.env.FRONTEND_URL || '*').split(','), credentials: true } });
initSockets(io);

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI || '')
  .then(() => {
    server.listen(PORT, () => console.log(`API on :${PORT}`));
  })
  .catch((e) => {
    console.error('DB error', e);
    process.exit(1);
  });
