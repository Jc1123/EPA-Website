import { neon } from '@neondatabase/serverless';

// Conecta automaticamente usando a variável que configuramos na Vercel
const sql = neon(process.env.DATABASE_URL);

export default sql;