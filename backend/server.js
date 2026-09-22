import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import recruitRoutes from './routes/recruit.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/recruit', recruitRoutes);

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ status: 'API Online' });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

export default app;