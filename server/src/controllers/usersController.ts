import { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth';

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

const updateSchema = z.object({ name: z.string().optional(), sport: z.string().optional(), language: z.string().optional(), avatarUrl: z.string().optional(), location: z.object({ state: z.string().optional(), district: z.string().optional() }).optional() });

export const updateSelf = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const data = updateSchema.parse(req.body);
  const user = await User.findByIdAndUpdate(req.user.id, data, { new: true }).select('-passwordHash');
  res.json(user);
};

export const listUsers = async (_req: Request, res: Response) => {
  const users = await User.find().select('-passwordHash').limit(100);
  res.json(users);
};

export const verifyUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, { verified: true }, { new: true }).select('-passwordHash');
  res.json(user);
};
