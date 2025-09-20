import mongoose, { Schema, Document } from 'mongoose';

export type Role = 'athlete' | 'coach' | 'sponsor' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: Role;
  sport?: string;
  location?: { state?: string; district?: string };
  category?: string;
  disability?: boolean;
  experienceYears?: number;
  language?: string;
  verified: boolean;
  avatarUrl?: string;
  gender?: 'male' | 'female' | 'other';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['athlete', 'coach', 'sponsor', 'admin'], required: true },
  sport: String,
  location: { state: String, district: String },
  category: String,
  disability: { type: Boolean, default: false },
  experienceYears: Number,
  language: String,
  verified: { type: Boolean, default: false },
  avatarUrl: String,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);
