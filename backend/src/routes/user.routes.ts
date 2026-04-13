import { Router } from 'express'
import { getUsers, updateProfile, updateUserRole, changePassword } from '../controllers/user.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { requireRole } from '../middleware/requireRole.js'

const router = Router()

router.get('/users', authenticate, requireRole('ADMIN'), getUsers)
router.put('/users/me', authenticate, updateProfile)              
router.put('/users/me/password', authenticate, changePassword)              
router.put('/users/:id/role', authenticate, requireRole('ADMIN'), updateUserRole) 

export default router