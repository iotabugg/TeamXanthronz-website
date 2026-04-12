import { Router } from 'express'
import { upload } from '../middleware/multer.middleware.js'
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../controllers/gallery.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import { requireRole } from '../middleware/requireRole.js'

const router = Router()

router.get('/gallery', getGallery)                                                                       
router.post('/gallery/new-image', authenticate, requireRole('ADMIN'), upload.single('image'), uploadGalleryImage)   
router.delete('/gallery/:id', authenticate, requireRole('ADMIN'), deleteGalleryImage)                      

export default router