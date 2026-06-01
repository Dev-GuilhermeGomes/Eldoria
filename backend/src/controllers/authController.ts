import { Request, Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { generateToken, hashPassword, comparePasswords } from '../utils/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já registado' });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = generateToken(user._id.toString(), user.email);

    res.status(201).json({
      message: 'Utilizador registado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao registar', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e password são obrigatórios' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou password inválidos' });
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou password inválidos' });
    }

    const token = generateToken(user._id.toString(), user.email);

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId)
      .populate('favoriteBooks')
      .populate('likedBooks')
      .populate('dislikedBooks');

    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      favoriteBooks: user.favoriteBooks,
      likedBooks: user.likedBooks,
      dislikedBooks: user.dislikedBooks
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao obter perfil', error: error.message });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name },
      { new: true }
    );

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: {
        id: user?._id,
        name: user?.name,
        email: user?.email
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
  }
};
