import express from 'express';

const router = express.Router();

// Rota de teste para verificação
router.get('/status', (req, res) => {
  res.json({ message: 'Rota de autenticação ativa' });
});

export default router;