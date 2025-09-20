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
  const FRONTEND_URL = process.env.FRONTEND_URL || '*';
  app.use(cors({ origin: FRONTEND_URL.split(','), credentials: true }));
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
