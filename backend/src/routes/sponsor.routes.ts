import { Router } from 'express'
import { upload } from '../middleware/multer.middleware.js'
import { getSponsors, createSponsor, updateSponsor, deleteSponsor } from '../controllers/sponsor.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { requireRole } from '../middleware/requireRole.js'

const router = Router()

router.get('/sponsors', getSponsors)
router.post('/sponsors/new-sponsor', authenticate, requireRole('ADMIN'), upload.single('logo'), createSponsor)
router.put('/sponsors/:id', authenticate, requireRole('ADMIN'), upload.single('logo'), updateSponsor)
router.delete('/sponsors/:id', authenticate, requireRole('ADMIN'), deleteSponsor)

export default router