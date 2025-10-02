import mongoose, { Document, Schema } from 'mongoose';

// Allowed roles
export type Role = 'admin' | 'partner';

// Interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  role: Role;
  phone?: string;
  available?: boolean;
  location?: { type: 'Point'; coordinates: [number, number] };
  createdAt?: Date;   // added for timestamps
  updatedAt?: Date;   // added for timestamps
}

// User schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    role: { type: String, enum: ['admin', 'partner'], required: true },
    phone: String,
    available: { type: Boolean, default: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  {
    timestamps: true, 
  }
);

// Create 2dsphere index for geolocation
UserSchema.index({ location: '2dsphere' });

// Create model
export default mongoose.model<IUser>('User', UserSchema);
