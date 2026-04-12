import { Router } from 'express'
import { upload } from '../middleware/multer.middleware.js'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { requireRole } from '../middleware/requireRole.js'

const router = Router()

router.get('/events', getEvents)
router.post('/events/create-event', authenticate, requireRole('ADMIN'), upload.single('image'), createEvent)
router.put('/events/:id', authenticate, requireRole('ADMIN'), upload.single('image'), updateEvent)
router.delete('/events/:id', authenticate, requireRole('ADMIN'), deleteEvent)

export default router