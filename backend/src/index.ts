import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/auth';

import authRoutes from './routes/authRoutes';
import booksRoutes from './routes/booksRoutes';
import contactRoutes from './routes/contactRoutes';
import chaptersRoutes from './routes/chaptersRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Conexão com MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.warn('MONGODB_URI não configurado; o servidor iniciará sem acesso à base de dados');
      return false;
    }

    await mongoose.connect(mongoUri);
    console.log('✓ MongoDB conectado com sucesso');
    return true;
  } catch (error) {
    console.error('✗ Erro ao conectar MongoDB:', error);
    process.exit(1);
  }
};

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', chaptersRoutes);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'FalltoBook API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not_configured'
  });
});

// Tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`✓ Servidor rodando em http://localhost:${PORT}`);
  });
};

startServer().catch(error => {
  console.error('✗ Erro ao iniciar servidor:', error);
  process.exit(1);
});

export default app;
