import mongoose, { Schema, Document } from 'mongoose';

export interface ISponsorshipCampaign extends Document {
  ownerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  budget: number;
  criteria?: string;
  status: string;
  applicants: mongoose.Types.ObjectId[];
  contracts: any[];
}

const SponsorshipCampaignSchema = new Schema<ISponsorshipCampaign>({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  criteria: String,
  status: { type: String, default: 'open' },
  applicants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  contracts: [Schema.Types.Mixed]
});

export const SponsorshipCampaign = mongoose.model<ISponsorshipCampaign>('SponsorshipCampaign', SponsorshipCampaignSchema);
