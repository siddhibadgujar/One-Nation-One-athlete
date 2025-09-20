import mongoose, { Schema, Document } from 'mongoose';

export interface IScholarship extends Document {
  title: string;
  description: string;
  eligibility: string;
  region?: string;
  paraFriendly?: boolean;
  applyUrl?: string;
  status: string;
}

const ScholarshipSchema = new Schema<IScholarship>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  region: String,
  paraFriendly: Boolean,
  applyUrl: String,
  status: { type: String, default: 'open' }
});

export const Scholarship = mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);
