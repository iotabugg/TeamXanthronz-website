import { Request, Response } from "express";
import { z } from "zod";
import { uploadToCloudinary, destroyFromCloudinary } from "../lib/cloudinary.js";
import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const gallerySchema = z.object({
    caption: z.string().optional(),
    type: z.enum(['SLIDER', 'COLLAGE']),
})


export const getGallery = asyncHandler(async (req: Request, res: Response) => {
    const type = req.query.type as 'SLIDER' | 'COLLAGE' | undefined

    const images = await prisma.galleryImage.findMany({
        where: type ? { type } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: { id: true, name: true }
            }
        }
    })

    res.json(new ApiResponse(200, images, 'Gallery fetched successfully'))
})

export const uploadGalleryImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, 'Image is required')
    }

    const parsed = gallerySchema.safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }

    const upload = await uploadToCloudinary(req.file.buffer)

    const image = await prisma.galleryImage.create({
        data: {
            url: upload.url,
            imgPublicId: upload.publicId,
            caption: parsed.data.caption,
            type: parsed.data.type,
            uploadedBy: req.user!.id,
        },
    })

    res.status(201).json(new ApiResponse(201, image, 'Image uploaded successfully'))
})


export const deleteGalleryImage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const existing = await prisma.galleryImage.findUnique({
        where: { id: id as string },
        select: { id: true, publicId: true }
    })
    if (!existing) {
        throw new ApiError(404, 'Image not found')
    }

    if (existing.publicId) {
        await destroyFromCloudinary(existing.publicId)
    }

    await prisma.galleryImage.delete({ where: { id: id as string } })

    res.json(new ApiResponse(200, null, 'Image deleted successfully'))
})