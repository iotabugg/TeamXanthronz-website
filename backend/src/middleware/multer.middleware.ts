import multer from "multer"

export const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 300 * 1024
    }
})