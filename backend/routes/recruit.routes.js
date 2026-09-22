const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { formLimiter } = require('../middlewares/rateLimit');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

// Public route: Enviar recrutamento (Protegido por Rate Limit)
router.post('/', formLimiter, (req, res) => {
    const { nick, dob } = req.body;
    if (!nick || !dob) return res.status(400).json({ message: 'Preencha todos os campos.' });

    db.run(`INSERT INTO recruits (nick, dob, date_applied) VALUES (?, ?, CURRENT_TIMESTAMP)`, 
    [nick, dob], function(err) {
        if (err) return res.status(500).json({ message: 'Erro ao salvar dados.' });
        res.status(201).json({ message: 'Sucesso' });
    });
});

// Admin route: Listar recrutas (Líder e Sublíder)
router.get('/', verifyToken, (req, res) => {
    db.all(`SELECT * FROM recruits`, [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Erro no BD' });
        res.json(rows);
    });
});

// Admin route: Deletar recruta (Apenas Líder)
router.delete('/:id', verifyToken, requireRole('lider'), (req, res) => {
    db.run(`DELETE FROM recruits WHERE id = ?`, req.params.id, function(err) {
        if (err) return res.status(500).json({ message: 'Erro ao deletar.' });
        res.json({ message: 'Recruta deletado.' });
    });
});

module.exports = router;