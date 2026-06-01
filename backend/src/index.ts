import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { errorHandler } from './middleware/auth';
import Book from './models/Book';

import authRoutes from './routes/authRoutes';
import booksRoutes from './routes/booksRoutes';
import contactRoutes from './routes/contactRoutes';

dotenv.config();

const app = express();
let mongoMemoryServer: MongoMemoryServer | null = null;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Conexão com MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log('✓ MongoDB conectado com sucesso');
      return;
    }

    mongoMemoryServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoMemoryServer.getUri());
    console.log('✓ MongoDB em memória iniciado para desenvolvimento');

    const existingBooks = await Book.countDocuments();
    if (existingBooks === 0) {
      await Book.insertMany([
        {
          title: 'O Eco da Biblioteca',
          synopsis: 'Uma história sobre um arquivo secreto onde livros escondem memórias vivas.',
          author: 'ViperBook Studio',
          coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
          genres: ['Fantasia', 'Mistério'],
          pages: 384,
          publishedDate: new Date('2024-01-15'),
          rating: 4.8,
          characters: [
            {
              name: 'Lia',
              description: 'Bibliotecária que percebe sussurros vindos das estantes.',
              history: 'Descobre um corredor oculto no subsolo da biblioteca central.',
              powers: ['Memória fotográfica', 'Leitura de ecos'],
              class: 'Herói',
              iconicQuote: 'Todo livro guarda uma porta.'
            }
          ]
        },
        {
          title: 'O Guardião do Sol Amarelo',
          synopsis: 'Num mundo de sombras, um guardião protege a última chama de leitura.',
          author: 'ViperBook Studio',
          coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
          genres: ['Aventura', 'Drama'],
          pages: 220,
          publishedDate: new Date('2024-03-20'),
          rating: 4.6,
          characters: [
            {
              name: 'Kael',
              description: 'Protetor da luz de leitura e dos manuscritos perdidos.',
              history: 'Jurou proteger a biblioteca quando as sombras avançaram sobre a cidade.',
              powers: ['Escudo solar', 'Luz concentrada'],
              class: 'Estelar',
              iconicQuote: 'Enquanto houver luz, haverá histórias.'
            }
          ]
        }
      ]);
      console.log('✓ Livros de demonstração adicionados');
    }
  } catch (error) {
    console.error('✗ Erro ao conectar MongoDB:', error);
    process.exit(1);
  }
};

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' });
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
