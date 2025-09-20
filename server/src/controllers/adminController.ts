import { Request, Response } from 'express';
import { User } from '../models/User';
import { PerformanceLog } from '../models/PerformanceLog';

export const reports = async (_req: Request, res: Response) => {
  const [users, logs] = await Promise.all([User.countDocuments(), PerformanceLog.countDocuments()]);
  res.json({ users, logs });
};

export const fairness = async (_req: Request, res: Response) => {
  const byRegion = await User.aggregate([
    { $group: { _id: '$location.state', count: { $sum: 1 } } },
    { $project: { state: '$_id', count: 1, _id: 0 } }
  ]);
  const byPara = await User.aggregate([
    { $group: { _id: '$disability', count: { $sum: 1 } } },
    { $project: { disability: '$_id', count: 1, _id: 0 } }
  ]);
  const byGender = await User.aggregate([
    { $group: { _id: '$gender', count: { $sum: 1 } } },
    { $project: { gender: '$_id', count: 1, _id: 0 } }
  ]);
  res.json({ byRegion, byPara, byGender });
};
