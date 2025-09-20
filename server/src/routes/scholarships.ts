import { Router } from 'express';
import { applyScholarship, listScholarships } from '../controllers/scholarshipController';

const router = Router();
router.get('/', listScholarships);
router.post('/apply', applyScholarship);

export default router;
