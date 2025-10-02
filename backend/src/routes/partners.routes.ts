import { Router } from "express";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";
import { getAssignedOrders, updateOrderStatus, setAvailability } from "../controllers/partners.controller";
import User from "../models/User.model";

const router = Router();

router.use(authMiddleware);

// ----------------- PARTNER ROUTES -----------------
router.get("/orders", getAssignedOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);
router.patch("/availability", setAvailability);

// ----------------- ADMIN ROUTES -----------------
// Get all partners (admin only)
router.get("/", requireRole("admin"), async (_req, res) => {
  try {
    const partners = await User.find({ role: "partner" }).select("_id name email");
    res.json({ partners });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
