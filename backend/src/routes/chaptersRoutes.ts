import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import {
  getAllChapters,
  getChapterByNumber,
  createChapter,
  updateChapter,
  deleteChapter
} from '../controllers/chaptersController';

const router = Router();

router.get('/books/:bookId/chapters', getAllChapters);
router.get('/books/:bookId/chapters/:number', getChapterByNumber);
router.post('/admin/books/:bookId/chapters', authenticateToken, requireAdmin, createChapter);
router.put('/admin/chapters/:id', authenticateToken, requireAdmin, updateChapter);
router.delete('/admin/chapters/:id', authenticateToken, requireAdmin, deleteChapter);

export default router;
