import { Router } from 'express';
import { allowRoles } from '../middleware/roles';
import { auth } from '../middleware/auth';
import { getUser, listUsers, updateSelf, verifyUser } from '../controllers/usersController';

const router = Router();
router.get('/:id', auth, getUser);
router.patch('/:id', auth, updateSelf);
router.get('/', auth, allowRoles('admin'), listUsers);
router.patch('/:id/verify', auth, allowRoles('admin'), verifyUser);

export default router;
