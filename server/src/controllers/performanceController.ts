import { Request, Response } from 'express';
import { z } from 'zod';
import { PerformanceLog } from '../models/PerformanceLog';
import { AuthRequest } from '../middleware/auth';

const logSchema = z.object({ date: z.coerce.date(), metrics: z.object({ distance: z.number().optional(), time: z.number().optional(), reps: z.number().optional(), notes: z.string().optional() }), streakGroupId: z.string().optional(), offlineId: z.string().optional() });

export const createLog = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const data = logSchema.parse(req.body);
  const log = await PerformanceLog.create({ ...data, userId: req.user.id });
  res.status(201).json(log);
};

export const listLogs = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const page = parseInt((req.query.page as string) || '1');
  const limit = parseInt((req.query.limit as string) || '20');
  const logs = await PerformanceLog.find({ userId: req.user.id }).sort({ date: -1 }).skip((page - 1) * limit).limit(limit);
  res.json(logs);
};

export const updateLog = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const data = logSchema.partial().parse(req.body);
  const updated = await PerformanceLog.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, data, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
};

export const deleteLog = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  await PerformanceLog.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.status(204).send();
};

export const batchSync = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const items = z.array(logSchema).parse(req.body);
  const mapped = items.map((i) => ({ ...i, userId: req.user!.id }));
  const result = await PerformanceLog.insertMany(mapped);
  res.status(201).json(result);
};
