import { Router } from 'express';
import { auth } from '../middleware/auth';
import { allowRoles } from '../middleware/roles';
import { applyCampaign, createCampaign, listCampaigns, updateCampaign } from '../controllers/sponsorshipController';

const router = Router();
router.get('/', listCampaigns);
router.post('/', auth, allowRoles('coach', 'sponsor'), createCampaign);
router.patch('/:id', auth, allowRoles('coach', 'sponsor'), updateCampaign);
router.post('/:id/apply', auth, allowRoles('athlete'), applyCampaign);

export default router;
