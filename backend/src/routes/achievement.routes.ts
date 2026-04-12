import { Router } from 'express'
import { upload } from '../middleware/multer.middleware.js'
import {
    getAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement
} from '../controllers/achievement.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { requireRole } from '../middleware/requireRole.js'

const router = Router()

router.get('/achievements', getAchievements)
router.post('/achievements/create-achievement', authenticate, requireRole('ADMIN'), upload.single('image'), createAchievement)
router.put('/achievements/:id', authenticate, requireRole('ADMIN'), upload.single('image'), updateAchievement)
router.delete('/achievements/:id', authenticate, requireRole('ADMIN'), deleteAchievement)

export default router