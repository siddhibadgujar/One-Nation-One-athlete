import { Router } from 'express';
import { auth } from '../middleware/auth';
import { allowRoles } from '../middleware/roles';
import { fairness, reports } from '../controllers/adminController';

const router = Router();
router.use(auth, allowRoles('admin'));
router.get('/reports', reports);
router.get('/fairness', fairness);

export default router;
