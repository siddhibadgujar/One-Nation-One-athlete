import mongoose from 'mongoose';

export const connectDB = async (uri: string) => {
  if (!uri) throw new Error('MONGODB_URI missing');
  await mongoose.connect(uri);
};
