import { Router } from 'express';
import { auth } from '../middleware/auth';
import { addMember, createGroup, listConversations, listMessages, removeMember } from '../controllers/messagingController';

const router = Router();
router.use(auth);
router.get('/conversations', listConversations);
router.get('/conversations/:id/messages', listMessages);
router.post('/groups', createGroup);
router.post('/conversations/:id/members', addMember);
router.delete('/conversations/:id/members', removeMember);

export default router;
