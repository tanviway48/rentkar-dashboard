import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import ordersRoutes from "./routes/orders.routes";
import partnersRoutes from "./routes/partners.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/partners", partnersRoutes);

// Error handler
app.use(errorHandler);

export default app;
