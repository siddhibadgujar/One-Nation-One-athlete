import { Router } from 'express';
import { upload } from '../middleware/upload';
import { handleUpload } from '../controllers/uploadController';
import { auth } from '../middleware/auth';

const router = Router();
router.post('/', auth, upload.single('file'), handleUpload);

export default router;
