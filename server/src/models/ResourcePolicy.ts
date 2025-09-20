import mongoose, { Schema, Document } from 'mongoose';

export interface IResourcePolicy extends Document {
  title: string;
  category: string;
  content: string;
  links: string[];
  region?: string;
}

const ResourcePolicySchema = new Schema<IResourcePolicy>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  links: [String],
  region: String
});

export const ResourcePolicy = mongoose.model<IResourcePolicy>('ResourcePolicy', ResourcePolicySchema);
