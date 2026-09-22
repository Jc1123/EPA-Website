const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const recruitRoutes = require('./routes/recruit.routes');
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/recruit', recruitRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));