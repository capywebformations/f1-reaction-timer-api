import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import timerRoutes from './routes/timer.routes';
import { errorHandler } from './middlewares/error.middleware';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/timer', timerRoutes);

// Setup Swagger
setupSwagger(app);

// Global Error Handler
app.use(errorHandler);

export default app;
