import jwt from 'jsonwebtoken';

export const signAccessToken = (sub: string, role: string) => {
  const secret = process.env.JWT_SECRET || 'dev';
  return jwt.sign({ role }, secret, { subject: sub, expiresIn: '15m' });
};

export const signRefreshToken = (sub: string, role: string) => {
  const secret = process.env.JWT_SECRET || 'dev';
  return jwt.sign({ role, type: 'refresh' }, secret, { subject: sub, expiresIn: '7d' });
};
