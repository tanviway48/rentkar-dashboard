import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

// Register user (admin or partner)
router.post("/register", register);

// Login user
router.post("/login", login);

export default router;
