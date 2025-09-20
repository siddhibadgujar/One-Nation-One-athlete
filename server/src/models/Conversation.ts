import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  type: 'dm' | 'group';
  memberIds: mongoose.Types.ObjectId[];
  name?: string;
  createdAt: Date;
}

const ConversationSchema = new Schema<IConversation>({
  type: { type: String, enum: ['dm', 'group'], required: true },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: String,
  createdAt: { type: Date, default: Date.now }
});

export const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);
