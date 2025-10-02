import { Response } from 'express';
import Order, { IOrder } from '../models/Order.model';
import { AuthRequest } from '../middleware/auth.middleware';
import { Types } from 'mongoose'; 

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, customerName, pickup, drop } = req.body;
    if (!orderId || !customerName || !pickup || !drop) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const order: IOrder = await Order.create({
      orderId,
      customerName,
      pickup: { address: pickup.address, location: { type: 'Point', coordinates: [pickup.lng, pickup.lat] } },
      drop: { address: drop.address, location: { type: 'Point', coordinates: [drop.lng, drop.lat] } },
      createdBy: req.user!._id,
      status: 'Created',
    });

    return res.json(order);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const listOrders = async (_req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find().populate('assignedTo', 'name email');
    return res.json(orders);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};



export const assignOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId, partnerId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Convert string to ObjectId
    order.assignedTo = new Types.ObjectId(partnerId);
    order.status = "Assigned";

    await order.save();

    return res.json({ message: "Order assigned successfully", order });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    // Fetch all orders and populate assigned partner details
    const orders = await Order.find()
      .populate('assignedTo', 'name email phone') // select only needed fields
      .sort({ createdAt: -1 }); // latest first

    return res.json({ success: true, orders });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};