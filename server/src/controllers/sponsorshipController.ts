import { Request, Response } from 'express';
import { z } from 'zod';
import { SponsorshipCampaign } from '../models/SponsorshipCampaign';
import { AuthRequest } from '../middleware/auth';

const campaignSchema = z.object({ title: z.string(), description: z.string(), budget: z.number(), criteria: z.string().optional(), status: z.string().optional() });

export const createCampaign = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const data = campaignSchema.parse(req.body);
  const item = await SponsorshipCampaign.create({ ...data, ownerId: req.user.id });
  res.status(201).json(item);
};

export const listCampaigns = async (_req: Request, res: Response) => {
  const items = await SponsorshipCampaign.find().limit(100);
  res.json(items);
};

export const updateCampaign = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const data = campaignSchema.partial().parse(req.body);
  const updated = await SponsorshipCampaign.findOneAndUpdate({ _id: req.params.id, ownerId: req.user.id }, data, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
};

export const applyCampaign = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const updated = await SponsorshipCampaign.findByIdAndUpdate(req.params.id, { $addToSet: { applicants: req.user.id } }, { new: true });
  res.json(updated);
};
