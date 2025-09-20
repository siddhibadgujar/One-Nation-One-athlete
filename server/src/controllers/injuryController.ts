import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { Injury } from '../models/Injury';

const createSchema = z.object({ date: z.coerce.date(), type: z.string(), severity: z.string(), notes: z.string().optional() });

export const createInjury = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const data = createSchema.parse(req.body);
  const files = Array.isArray(req.files) ? req.files : [];
  const fileUrls = files.map((f: any) => (f.location ? f.location : `/uploads/${f.filename}`));
  const injury = await Injury.create({ ...data, files: fileUrls, userId: req.user.id });
  res.status(201).json(injury);
};

export const listInjuries = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const list = await Injury.find({ userId: req.user.id }).sort({ date: -1 });
  res.json(list);
};
