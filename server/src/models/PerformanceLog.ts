import mongoose, { Schema, Document } from 'mongoose';

export interface IPerformanceLog extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  metrics: { distance?: number; time?: number; reps?: number; notes?: string };
  streakGroupId?: string;
  offlineId?: string;
  createdAt: Date;
}

const PerformanceLogSchema = new Schema<IPerformanceLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  metrics: { distance: Number, time: Number, reps: Number, notes: String },
  streakGroupId: String,
  offlineId: String,
  createdAt: { type: Date, default: Date.now }
});

export const PerformanceLog = mongoose.model<IPerformanceLog>('PerformanceLog', PerformanceLogSchema);
