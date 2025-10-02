import { Response } from 'express';
import Order, { IOrder, OrderStatus } from '../models/Order.model';
import { AuthRequest } from '../middleware/auth.middleware';
import mongoose from 'mongoose';

const allowedStatuses: OrderStatus[] = ['Created', 'Assigned', 'Picked', 'Delivered', 'Cancelled'];

export const getAssignedOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ assignedTo: req.user!._id });
  res.json(orders);
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || !status || !allowedStatuses.includes(status as OrderStatus)) {
      return res.status(400).json({ message: 'Invalid input or status' });
    }
    if (!mongoose.Types.ObjectId.isValid(orderId)) return res.status(400).json({ message: 'Invalid orderId' });

    const order: IOrder | null = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status as OrderStatus;
    await order.save();

    return res.json({ message: 'Order status updated', order });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const setAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const { available } = req.body;
    if (typeof available !== 'boolean') return res.status(400).json({ message: 'Invalid availability value' });

    req.user!.available = available;
    await req.user!.save();
    res.json({ message: 'Availability updated', available });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
