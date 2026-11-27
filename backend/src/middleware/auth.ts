import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export type AuthenticatedParamsRequest<P extends Record<string, string> = Record<string, string>> = Request<P> & {
  userId?: string;
  userEmail?: string;
};

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as { userId: string; email: string };
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId).select('role');
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso exclusivo para administradores' });
    }
    next();
  } catch {
    res.status(403).json({ message: 'Não foi possível validar o administrador' });
  }
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Erro de validação', details: err.message });
  }
  
  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(400).json({ message: 'Este email já existe' });
  }
  
  res.status(err.status || 500).json({
    message: err.message || 'Erro no servidor'
  });
};
