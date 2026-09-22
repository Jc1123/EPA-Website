import express from 'express';
import authRoutes from './routes/auth.routes.js';
import recruitRoutes from './routes/recruit.routes.js';

const app = express();

app.use(express.json());

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/recruit', recruitRoutes);

export default app;