import { Request, Response } from 'express';
import Chapter from '../models/Chapter';
import Book from '../models/Book';
import mongoose from 'mongoose';

const findBook = async (bookId: string) => {
  if (mongoose.isValidObjectId(bookId)) {
    return Book.findById(bookId);
  }
  return Book.findOne({ slug: bookId });
};

export const getAllChapters = async (req: Request, res: Response) => {
  try {
    const book = await findBook(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
    const chapters = await Chapter.find({ bookId: book._id })
      .select('-content')
      .sort({ number: 1 });
    res.json({ total: chapters.length, chapters });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao obter capítulos', error: error.message });
  }
};

export const getChapterByNumber = async (req: Request, res: Response) => {
  try {
    const book = await findBook(req.params.bookId);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
    const chapter = await Chapter.findOne({
      bookId: book._id,
      number: Number(req.params.number)
    });
    if (!chapter) {
      return res.status(404).json({ message: 'Capítulo não encontrado' });
    }
    res.json({ chapter });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao obter capítulo', error: error.message });
  }
};

export const createChapter = async (req: Request, res: Response) => {
  try {
    const book = await findBook(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    const chapter = await Chapter.create({
      bookId: book._id,
      number: req.body.number,
      title: req.body.title,
      content: req.body.content,
      excerpt: req.body.excerpt || req.body.content?.slice(0, 240),
      image: req.body.image || '',
      publishedDate: req.body.publishedDate || new Date()
    });
    res.status(201).json({ chapter });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Já existe um capítulo com este número' });
    }
    res.status(500).json({ message: 'Erro ao criar capítulo', error: error.message });
  }
};

export const updateChapter = async (req: Request, res: Response) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      {
        number: req.body.number,
        title: req.body.title,
        content: req.body.content,
        excerpt: req.body.excerpt,
        image: req.body.image,
        publishedDate: req.body.publishedDate
      },
      { new: true, runValidators: true }
    );
    if (!chapter) {
      return res.status(404).json({ message: 'Capítulo não encontrado' });
    }
    res.json({ chapter });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao atualizar capítulo', error: error.message });
  }
};

export const deleteChapter = async (req: Request, res: Response) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: 'Capítulo não encontrado' });
    }
    res.json({ message: 'Capítulo removido com sucesso' });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao remover capítulo', error: error.message });
  }
};
