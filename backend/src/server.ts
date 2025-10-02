import 'dotenv/config'; // must be first
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes'; // import auth router
import ordersRoutes from './routes/orders.routes'; // import order router
import partnersRoutes from './routes/partners.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // attach auth routes
app.use('/api/orders', ordersRoutes); // attach auth routes
app.use('/api/partners', partnersRoutes); // attach auth routes



// Test route
app.get('/', (req, res) => {
  res.send('🚀 Delivery Management Backend is running!');
});

// Start server only after DB connection
const startServer = async (): Promise<void> => {
  try {
    await connectDB(); // wait for MongoDB connection
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
