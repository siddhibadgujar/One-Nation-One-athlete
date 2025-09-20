import { Request, Response } from 'express';

export const handleUpload = async (req: Request, res: Response) => {
  const file = (req as any).file;
  if (!file) return res.status(400).json({ error: 'No file' });
  const url = file.location ? file.location : `/uploads/${file.filename}`;
  res.json({ url });
};
