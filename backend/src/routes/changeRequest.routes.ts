import { Router } from 'express'
import {
    createChangeRequest,
    getChangeRequests,
    resolveChangeRequest
} from '../controllers/changeRequest.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { requireRole } from '../middleware/requireRole.js'

const router = Router()

router.post('/request-change', authenticate, requireRole('MEMBER'), createChangeRequest)
router.get('/requests', authenticate, getChangeRequests)                              
router.put('/requests/:id', authenticate, requireRole('ADMIN'), resolveChangeRequest)

export default router