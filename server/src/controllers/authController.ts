import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { signAccessToken, signRefreshToken } from '../utils/jwt';

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
  role: z.enum(['athlete', 'coach', 'sponsor', 'admin']).default('athlete'),
  sport: z.string().optional(),
  location: z.object({ state: z.string().optional(), district: z.string().optional() }).optional(),
  category: z.string().optional(),
  disability: z.boolean().optional(),
  experienceYears: z.number().optional(),
  language: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional()
});

export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const exists = await User.findOne({ email: data.email });
  if (exists) return res.status(400).json({ error: 'Email in use' });
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    passwordHash,
    role: data.role,
    sport: data.sport,
    location: data.location,
    category: data.category,
    disability: data.disability,
    experienceYears: data.experienceYears,
    language: data.language,
    gender: data.gender,
    verified: data.role === 'admin'
  });
  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = signRefreshToken(user.id, user.role);
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
};

const loginSchema = z.object({ email: z.string().email(), password: z.string() });

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const user = await User.findOne({ email: data.email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(data.password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = signRefreshToken(user.id, user.role);
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) return res.status(400).json({ error: 'No refresh token' });
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'dev') as any;
    if (decoded.type !== 'refresh') throw new Error('Invalid token');
    const accessToken = signAccessToken(decoded.sub, decoded.role);
    const newRefresh = signRefreshToken(decoded.sub, decoded.role);
    res.json({ accessToken, refreshToken: newRefresh });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const me = async (req: Request, res: Response) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev') as any;
    const user = await User.findById(decoded.sub);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
