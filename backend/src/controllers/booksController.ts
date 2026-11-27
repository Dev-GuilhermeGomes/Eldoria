import { Request, Response } from 'express';
import Book from '../models/Book';
import User from '../models/User';
import { AuthenticatedParamsRequest } from '../middleware/auth';
import mongoose from 'mongoose';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { genre, search, sort } = req.query;
    let query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { synopsis: { $regex: search, $options: 'i' } }
      ];
    }

    if (genre) {
      query.genres = genre;
    }

    let books = Book.find(query);

    if (sort === 'views') {
      books = books.sort({ views: -1 });
    } else if (sort === 'rating') {
      books = books.sort({ rating: -1 });
    } else {
      books = books.sort({ createdAt: -1 });
    }

    const result = await books.exec();

    res.json({
      total: result.length,
      books: result
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao obter livros', error: error.message });
  }
};

export const getBookById = async (req: AuthenticatedParamsRequest<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    
    const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
    const book = await Book.findOneAndUpdate(
      filter,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    const authorBooks = await Book.find({ author: book.author, _id: { $ne: book._id } }).limit(5);

    res.json({
      book,
      moreFromAuthor: authorBooks
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao obter livro', error: error.message });
  }
};

export const likeBook = async (req: AuthenticatedParamsRequest<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    const isLiked = user.likedBooks.includes(id as any);
    const isDisliked = user.dislikedBooks.includes(id as any);

    if (isLiked) {
      user.likedBooks = user.likedBooks.filter((bookId) => bookId.toString() !== id);
      book.likes = Math.max(0, book.likes - 1);
    } else {
      if (!user.likedBooks.includes(id as any)) {
        user.likedBooks.push(id as any);
      }
      book.likes += 1;

      if (isDisliked) {
        user.dislikedBooks = user.dislikedBooks.filter((bookId) => bookId.toString() !== id);
        book.dislikes = Math.max(0, book.dislikes - 1);
      }
    }

    await user.save();
    await book.save();

    res.json({ message: 'Livro marcado como gostei' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao marcar livro', error: error.message });
  }
};

export const dislikeBook = async (req: AuthenticatedParamsRequest<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    const isDisliked = user.dislikedBooks.includes(id as any);
    const isLiked = user.likedBooks.includes(id as any);

    if (isDisliked) {
      user.dislikedBooks = user.dislikedBooks.filter((bookId) => bookId.toString() !== id);
      book.dislikes = Math.max(0, book.dislikes - 1);
    } else {
      if (!user.dislikedBooks.includes(id as any)) {
        user.dislikedBooks.push(id as any);
      }
      book.dislikes += 1;

      if (isLiked) {
        user.likedBooks = user.likedBooks.filter((bookId) => bookId.toString() !== id);
        book.likes = Math.max(0, book.likes - 1);
      }
    }

    await user.save();
    await book.save();

    res.json({ message: 'Livro marcado como não gostei' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao desmarcar livro', error: error.message });
  }
};
