
import 'dotenv/config';
import mongoose from 'mongoose';

export function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is missing from .env');
  }

  return mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('MongoDB connected successfully!');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      throw error;
    });
}
