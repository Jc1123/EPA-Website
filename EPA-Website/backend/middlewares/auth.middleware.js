const jwt = require('jsonwebtoken');
const SECRET = 'SUPER_SECRET_KEY_EMBRAPA'; // No Vercel, use process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token não fornecido.' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Acesso negado.' });
        req.user = decoded; // { id, role }
        next();
    });
};

const requireRole = (roleRequired) => {
    return (req, res, next) => {
        if (req.user.role !== roleRequired) {
            return res.status(403).json({ message: 'Permissão insuficiente.' });
        }
        next();
    };
};

module.exports = { verifyToken, requireRole, SECRET };