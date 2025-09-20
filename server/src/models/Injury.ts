import mongoose, { Schema, Document } from 'mongoose';

export interface IInjury extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  type: string;
  severity: string;
  notes?: string;
  files: string[];
}

const InjurySchema = new Schema<IInjury>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  severity: { type: String, required: true },
  notes: String,
  files: [String]
});

export const Injury = mongoose.model<IInjury>('Injury', InjurySchema);
