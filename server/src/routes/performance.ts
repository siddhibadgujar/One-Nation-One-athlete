import { Router } from 'express';
import { auth } from '../middleware/auth';
import { batchSync, createLog, deleteLog, listLogs, updateLog } from '../controllers/performanceController';

const router = Router();
router.use(auth);
router.post('/', createLog);
router.get('/', listLogs);
router.patch('/:id', updateLog);
router.delete('/:id', deleteLog);
router.post('/batch', batchSync);

export default router;
