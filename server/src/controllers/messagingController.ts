import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';

export const listConversations = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const items = await Conversation.find({ memberIds: req.user.id }).sort({ createdAt: -1 });
  res.json(items);
};

export const listMessages = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const items = await Message.find({ conversationId: req.params.id }).sort({ createdAt: 1 });
  res.json(items);
};

const groupSchema = z.object({ name: z.string(), memberIds: z.array(z.string()) });
export const createGroup = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const data = groupSchema.parse(req.body);
  const conv = await Conversation.create({ type: 'group', name: data.name, memberIds: [req.user.id, ...data.memberIds] });
  res.status(201).json(conv);
};

export const addMember = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const { userId } = req.body as any;
  const updated = await Conversation.findByIdAndUpdate(req.params.id, { $addToSet: { memberIds: userId } }, { new: true });
  res.json(updated);
};

export const removeMember = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const { userId } = req.body as any;
  const updated = await Conversation.findByIdAndUpdate(req.params.id, { $pull: { memberIds: userId } }, { new: true });
  res.json(updated);
};
