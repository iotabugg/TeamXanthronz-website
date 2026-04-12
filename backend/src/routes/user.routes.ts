import { Router } from 'express'
import { getUsers, updateProfile, updateUserRole, changePassword } from '../controllers/user.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { requireRole } from '../middleware/requireRole.js'

const router = Router()

router.get('/', authenticate, requireRole('ADMIN'), getUsers)
router.put('/me', authenticate, updateProfile)              
router.put('/me/password', authenticate, changePassword)              
router.put('/:id/role', authenticate, requireRole('ADMIN'), updateUserRole) 

export default router