const rateLimit = require('express-rate-limit');

// Bloqueia envios massivos (Anti-DDoS e Brute Force Layer 7)
const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limita cada IP a 5 requests por janela
    message: { message: 'Muitas requisições deste IP, tente novamente mais tarde.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { formLimiter };