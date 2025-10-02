// db.ts

import mongoose, { ConnectOptions } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not set in environment variables');
}


const options: ConnectOptions = {
  
};

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log('MongoDB connected successfully');
  } catch (err: any) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
  }
};


mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected'));
mongoose.connection.on('reconnected', () => console.log('♻️ MongoDB reconnected'));
