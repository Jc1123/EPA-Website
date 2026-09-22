import express from 'express';
import sql from '../db/database.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rota pública: Enviar recrutamento
router.post('/', async (req, res) => {
    try {
        const { nick, dob } = req.body;
        if (!nick || !dob) {
            return res.status(400).json({ message: 'Preencha todos os campos.' });
        }

        await sql`INSERT INTO recruits (nick, dob) VALUES (${nick}, ${dob})`;
        
        return res.status(201).json({ message: 'Solicitação enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar recrutamento:', error);
        return res.status(500).json({ message: 'Erro ao salvar dados.' });
    }
});

// Rota administrativa: Listar recrutas (Líder e Sublíder)
router.get('/', verifyToken, async (req, res) => {
    try {
        const rows = await sql`SELECT * FROM recruits ORDER BY date_applied DESC`;
        return res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar recrutas:', error);
        return res.status(500).json({ message: 'Erro no banco de dados.' });
    }
});

// Rota administrativa: Deletar recruta (Apenas Líder)
router.delete('/:id', verifyToken, requireRole('lider'), async (req, res) => {
    try {
        const { id } = req.params;
        await sql`DELETE FROM recruits WHERE id = ${id}`;
        return res.json({ message: 'Recruta deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar recruta:', error);
        return res.status(500).json({ message: 'Erro ao deletar.' });
    }
});

export default router;