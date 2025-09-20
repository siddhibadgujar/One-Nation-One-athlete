import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import performanceRoutes from './routes/performance';
import injuriesRoutes from './routes/injuries';
import scholarshipsRoutes from './routes/scholarships';
import sponsorshipsRoutes from './routes/sponsorships';
import messagingRoutes from './routes/messaging';
import uploadsRoutes from './routes/uploads';
import adminRoutes from './routes/admin';
import assistantRoutes from './routes/assistant';
import { errorHandler } from './middleware/error';

dotenv.config();

export const buildApp = () => {
  const app = express();
  const allowed = (process.env.FRONTEND_URL || '').split(',').map((s) => s.trim()).filter(Boolean);
  const origin = (o: any, cb: any) => {
    if (!o) return cb(null, true);
    const val = String(o);
    const ok = allowed.length === 0 || allowed.some((a) => val === a || (a.startsWith('*.') && val.endsWith(a.slice(1))));
    if (ok || val.endsWith('.vercel.app') || val.endsWith('.vercel.dev')) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  };
  app.use(cors({ origin, credentials: true }));
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(rateLimit({ windowMs: 60_000, max: 200 }));
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/auth', authRoutes);
  app.use('/users', usersRoutes);
  app.use('/performance', performanceRoutes);
  app.use('/injuries', injuriesRoutes);
  app.use('/scholarships', scholarshipsRoutes);
  app.use('/sponsorships', sponsorshipsRoutes);
  app.use('/messaging', messagingRoutes);
  app.use('/uploads', uploadsRoutes);
  app.use('/admin', adminRoutes);
  app.use('/assistant', assistantRoutes);

  app.use(errorHandler);
  return app;
};
