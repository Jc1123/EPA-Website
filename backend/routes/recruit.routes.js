import express from 'express';
import sql from '../db/database.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rota pública: Enviar recrutamento
router.post('/', async (req, res) => {
    try {
        const { nick, dob } = req.body;
        if (!nick || !dob) return res.status(400).json({ message: 'Preencha todos os campos.' });

        await sql`INSERT INTO recruits (nick, dob, date_applied) VALUES (${nick}, ${dob}, CURRENT_TIMESTAMP)`;
        res.status(201).json({ message: 'Sucesso' });
    } catch (error) {
        console.error('Erro ao salvar recrutamento:', error);
        res.status(500).json({ message: 'Erro ao salvar dados.' });
    }
});

// Rota administrativa: Listar recrutas (Líder e Sublíder)
router.get('/', verifyToken, async (req, res) => {
    try {
        const rows = await sql`SELECT * FROM recruits ORDER BY date_applied DESC`;
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar recrutas:', error);
        res.status(500).json({ message: 'Erro no BD' });
    }
});

// Rota administrativa: Deletar recruta (Apenas Líder)
router.delete('/:id', verifyToken, requireRole('lider'), async (req, res) => {
    try {
        const { id } = req.params;
        await sql`DELETE FROM recruits WHERE id = ${id}`;
        res.json({ message: 'Recruta deletado.' });
    } catch (error) {
        console.error('Erro ao deletar recruta:', error);
        res.status(500).json({ message: 'Erro ao deletar.' });
    }
});

export default router;