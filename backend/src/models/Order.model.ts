import mongoose, { Document, Schema } from 'mongoose';

// Allowed order statuses
export type OrderStatus = 'Created' | 'Assigned' | 'Picked' | 'Delivered' | 'Cancelled';

// Interface for Order document
export interface IOrder extends Document {
  orderId: string;
  customerName?: string;
  pickup: {
    address?: string;
    location: { type: 'Point'; coordinates: [number, number] };
  };
  drop: {
    address?: string;
    location: { type: 'Point'; coordinates: [number, number] };
  };
  status: OrderStatus;
  assignedTo?: mongoose.Types.ObjectId | null;
  createdBy?: mongoose.Types.ObjectId;
  createdAt?: Date;   // added for timestamps
  updatedAt?: Date;   // added for timestamps
}

// Order schema
const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: String,
    pickup: {
      address: String,
      location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
      },
    },
    drop: {
      address: String,
      location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true },
      },
    },
    status: {
      type: String,
      enum: ['Created', 'Assigned', 'Picked', 'Delivered', 'Cancelled'],
      default: 'Created',
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true, 
  }
);

// Create model
export default mongoose.model<IOrder>('Order', OrderSchema);
