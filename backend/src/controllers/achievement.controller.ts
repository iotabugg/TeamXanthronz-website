import { Request, Response } from "express";
import { z } from "zod";
import { uploadToCloudinary, destroyFromCloudinary } from "../lib/cloudinary.js";
import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const PAGE_SIZE = 6


const achievementSchema = z.object({
    title: z.string().min(2),
    category: z.string().min(2),
    year: z.coerce.number().int().min(2018),
    rankSummary: z.preprocess(
        (val) => (typeof val === 'string' ? JSON.parse(val) : val),
        z.any().optional()
    ),
    highlights: z.preprocess(
        (val) => (typeof val === 'string' ? JSON.parse(val) : val),
        z.array(z.string())
    ),
})


export const getAchievements = asyncHandler(async (req: Request, res: Response) => {
    const page = req.query.page ? Number(req.query.page) : 1
    const year = req.query.year ? Number(req.query.year) : undefined

    const where = year ? { year } : undefined

    const [total, achievements] = await Promise.all([
        prisma.achievement.count({ where }),
        prisma.achievement.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
        })
    ])

    const totalPages = Math.ceil(total / PAGE_SIZE)

    res.json(
        new ApiResponse(200, {
            achievements,
            total,
            page,
            totalPages,
            hasMore: page < totalPages,
        }, 'Achievements fetched successfully')
    )
})


export const createAchievement = asyncHandler(async (req: Request, res: Response) => {
    const parsed = achievementSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }

    let imageUrl: string | undefined
    let imgPublicId: string | undefined
    if (req.file) {
        const upload = await uploadToCloudinary(req.file.buffer)
        imageUrl = upload.url
        imgPublicId = upload.publicId
    }

    const achievement = await prisma.achievement.create({
        data: {
            ...parsed.data,
            imageUrl,
            imgPublicId,
            ...(parsed.data.rankSummary && { rankSummary: parsed.data.rankSummary }),
        },
    })

    res.status(201).json(
        new ApiResponse(201, achievement, 'Achievement created successfully')
    )
})


export const updateAchievement = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const achievement = await prisma.achievement.findUnique({
        where: { id : id as string},
        select: { id: true, imgPublicId: true }
    })
    if (!achievement) {
        throw new ApiError(404, 'Achievement not found')
    }

    const parsed = achievementSchema.partial().safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }

    let imageUrl: string | undefined
    let imgPublicId: string | undefined
    if (req.file) {
        const upload = await uploadToCloudinary(req.file.buffer)
        imageUrl = upload.url
        imgPublicId = upload.publicId
    }

    const updated = await prisma.achievement.update({
        where: { id: id as string },
        data: {
            ...(parsed.data.rankSummary && { rankSummary: parsed.data.rankSummary }),
            ...(parsed.data.title && { title: parsed.data.title }),
            ...(parsed.data.category && { category: parsed.data.category }),
            ...(parsed.data.year && { year: parsed.data.year }),
            ...(parsed.data.highlights && { highlights: parsed.data.highlights }),
            ...(imageUrl && { imageUrl }),
            ...(imgPublicId && { imgPublicId }),
        },
    })

    if (req.file && achievement.imgPublicId) {
        await destroyFromCloudinary(achievement.imgPublicId)
    }

    res.json(
        new ApiResponse(200, updated, 'Achievement updated successfully')
    )
})


export const deleteAchievement = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const existing = await prisma.achievement.findUnique({
        where: { id : id as string },
        select: { id: true, imgPublicId: true }
    })
    if (!existing) {
        throw new ApiError(404, 'Achievement not found')
    }

    if (existing.imgPublicId) {
        await destroyFromCloudinary(existing.imgPublicId)
    }

    await prisma.achievement.delete({ where: { id: id as string } })

    res.json(new ApiResponse(200, null, 'Achievement deleted successfully'))
})