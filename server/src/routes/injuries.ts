import { Router } from 'express';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { createInjury, listInjuries } from '../controllers/injuryController';

const router = Router();
router.use(auth);
router.post('/', upload.array('files', 5), createInjury);
router.get('/', listInjuries);

export default router;
