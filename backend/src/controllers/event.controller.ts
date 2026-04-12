import { Request, Response } from "express";
import { z } from "zod";
import { uploadToCloudinary, destroyFromCloudinary } from "../lib/cloudinary.js";
import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const eventSchema = z.object({
    title: z.string().min(2),
    venue: z.string().min(2),
    description: z.string().min(10),
    date: z.coerce.date(),
    status: z.enum(['UPCOMING', 'COMPLETED']).default('UPCOMING'),
})


export const getEvents = asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as 'UPCOMING' | 'COMPLETED' | undefined

    const events = await prisma.event.findMany({
        where: status ? { status } : undefined,
        orderBy: { date: 'asc' },
    })

    res.json(new ApiResponse(200, events, 'Events fetched successfully'))
})


export const createEvent = asyncHandler(async (req: Request, res: Response) => {
    const parsed = eventSchema.safeParse(req.body)
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

    const event = await prisma.event.create({
        data: { ...parsed.data, imageUrl, imgPublicId },
    })

    res.status(201).json(new ApiResponse(201, event, 'Event created successfully'))
})


export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const event = await prisma.event.findUnique({
        where: { id: id as string },
        select: { id: true, imgPublicId: true }
    })
    if (!event) {
        throw new ApiError(404, 'Event not found')
    }

    const parsed = eventSchema.partial().safeParse(req.body)
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

    const updated = await prisma.event.update({
        where: { id: id as string },
        data: {
            ...parsed.data,
            ...(imageUrl && { imageUrl }),
            ...(imgPublicId && { imgPublicId }),
        },
    })

    if (req.file && event.imgPublicId) {
        await destroyFromCloudinary(event.imgPublicId)
    }

    res.json(new ApiResponse(200, updated, 'Event updated successfully'))
})


export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const existing = await prisma.event.findUnique({
        where: { id: id as string },
        select: { id: true, imgPublicId: true }
    })
    if (!existing) {
        throw new ApiError(404, 'Event not found')
    }

    if (existing.imgPublicId) {
        await destroyFromCloudinary(existing.imgPublicId)
    }

    await prisma.event.delete({ where: { id: id as string } })

    res.json(new ApiResponse(200, null, 'Event deleted successfully'))
})