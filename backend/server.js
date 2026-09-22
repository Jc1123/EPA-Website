import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import recruitRoutes from './routes/recruit.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/recruit', recruitRoutes);

// Executa o escutador de porta apenas em ambiente local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));
}

// Exportação obrigatória para a Vercel funcionar como Serverless
export default app;