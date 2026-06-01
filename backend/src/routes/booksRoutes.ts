import { Router } from 'express';
import { getAllBooks, getBookById, likeBook, dislikeBook } from '../controllers/booksController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/:id/like', authenticateToken, likeBook);
router.post('/:id/dislike', authenticateToken, dislikeBook);

export default router;
