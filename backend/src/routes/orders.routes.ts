import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createOrder, getOrders, assignOrder } from "../controllers/orders.controller";

const router = Router();

// All order routes require authentication
router.use(authMiddleware);

// Admin routes
router.post("/", createOrder);
router.get("/", getOrders);
router.post("/:orderId/assign/:partnerId", assignOrder);

export default router;
