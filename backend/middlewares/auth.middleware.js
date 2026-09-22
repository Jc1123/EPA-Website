import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'SUPER_SECRET_KEY_EMBRAPA';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token não fornecido.' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Acesso negado.' });
    req.user = decoded;
    next();
  });
};

export const requireRole = (roleRequired) => {
  return (req, res, next) => {
    if (req.user.role !== roleRequired) {
      return res.status(403).json({ message: 'Permissão insuficiente.' });
    }
    next();
  };
};