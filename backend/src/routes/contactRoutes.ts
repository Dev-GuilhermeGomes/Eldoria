import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/contactController';

const router = Router();

router.post('/', sendMessage);
router.get('/', getMessages);

export default router;
