import { Request, Response } from 'express';
import { z } from 'zod';
import { Scholarship } from '../models/Scholarship';

export const listScholarships = async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1');
  const limit = parseInt((req.query.limit as string) || '20');
  const items = await Scholarship.find().skip((page - 1) * limit).limit(limit);
  res.json(items);
};

const applySchema = z.object({ userId: z.string(), scholarshipId: z.string() });
export const applyScholarship = async (req: Request, res: Response) => {
  const _data = applySchema.parse(req.body);
  res.json({ status: 'received' });
};
