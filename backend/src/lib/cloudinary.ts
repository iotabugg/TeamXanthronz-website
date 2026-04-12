import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadToCloudinary = (buffer : Buffer) : Promise<{ url: string; publicId: string }> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'ebaja/members' },
            (error, result) => {
                if(error || !result) return reject(error)
                resolve({ url: result.secure_url, publicId: result.public_id })
            }
        )
        stream.end(buffer)
    })
}

export { uploadToCloudinary }

const destroyFromCloudinary = (publicId: string): Promise<object | null> => {
    return new Promise((resolve, reject) => {
        if (!publicId) return resolve(null)
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.error("Cloudinary destroy failed:", error.message || error)
                return reject(error)
            }
            resolve(result)
        })
    })
}

export { destroyFromCloudinary }