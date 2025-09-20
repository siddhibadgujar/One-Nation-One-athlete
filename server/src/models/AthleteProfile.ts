import mongoose, { Schema, Document } from 'mongoose';

export interface IAthleteProfile extends Document {
  userId: mongoose.Types.ObjectId;
  bio?: string;
  photos: string[];
  videos: string[];
  achievements: string[];
  badges: string[];
  social: { platform: string; url: string }[];
}

const AthleteProfileSchema = new Schema<IAthleteProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bio: String,
  photos: [String],
  videos: [String],
  achievements: [String],
  badges: [String],
  social: [{ platform: String, url: String }]
});

export const AthleteProfile = mongoose.model<IAthleteProfile>('AthleteProfile', AthleteProfileSchema);
