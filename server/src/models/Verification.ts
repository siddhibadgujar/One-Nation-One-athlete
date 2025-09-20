import mongoose, { Schema, Document } from 'mongoose';

export interface IVerification extends Document {
  userId: mongoose.Types.ObjectId;
  documents: string[];
  status: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
}

const VerificationSchema = new Schema<IVerification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  documents: [String],
  status: { type: String, default: 'pending' },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date
});

export const Verification = mongoose.model<IVerification>('Verification', VerificationSchema);
