import multer, { StorageEngine } from "multer"
import { Request } from "express"
import fs from "fs"

if (!fs.existsSync("public/temp")) {
    fs.mkdirSync("public/temp", { recursive: true })
}

const storage: StorageEngine = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        cb(null, "public/temp/")
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename : string) => void
    ) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

export const upload = multer({ 
    storage,
    limits : {
        fileSize: 300 * 1024
    }
})