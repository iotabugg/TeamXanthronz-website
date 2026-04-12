import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
    getMembers,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/member.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router()

router.get('/squads', getMembers)
router.post('/squads/create-member', authenticate, requireRole('ADMIN'), upload.single('image'), createMember)
router.put('/squads/:id', authenticate, requireRole('ADMIN'),upload.single('image'), updateMember)
router.delete('/squads/:id', authenticate, requireRole('ADMIN'), deleteMember)

export default router