import { Request, Response } from 'express';
import ContactMessage from '../models/Contact';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();

    res.status(201).json({
      message: 'Mensagem enviada com sucesso',
      messageId: newMessage._id
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao enviar mensagem', error: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({
      total: messages.length,
      messages
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao obter mensagens', error: error.message });
  }
};
