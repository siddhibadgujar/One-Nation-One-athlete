import { Router } from 'express';
import { askAssistant } from '../controllers/assistantController';
import { auth } from '../middleware/auth';

const router = Router();
router.post('/ask', auth, askAssistant);

export default router;
