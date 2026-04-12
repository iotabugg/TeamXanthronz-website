import { Request, Response } from "express";
import { z } from "zod";
import { uploadToCloudinary, destroyFromCloudinary } from "../lib/cloudinary.js";
import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const sponsorSchema = z.object({
    name: z.string().min(2),
    websiteUrl: z.url().optional().or(z.literal('')),
    order: z.coerce.number().int().default(0),
    isActive: z.preprocess(
        (val) => val === 'true' || val === true,
        z.boolean()
    ).default(true),
})


export const getSponsors = asyncHandler(async (req: Request, res: Response) => {
    const sponsors = await prisma.sponsor.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
    })

    res.json(new ApiResponse(200, sponsors, 'Sponsors fetched successfully'))
})


export const createSponsor = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {    
        throw new ApiError(400, 'Sponsor logo is required')             // logo is required !!
    }

    const parsed = sponsorSchema.safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }

    const upload = await uploadToCloudinary(req.file.buffer)

    const sponsor = await prisma.sponsor.create({
        data: {
            ...parsed.data,
            logoUrl: upload.url,
            logoPublicId: upload.publicId,
        },
    })

    res.status(201).json(new ApiResponse(201, sponsor, 'Sponsor created successfully'))
})


export const updateSponsor = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const sponsor = await prisma.sponsor.findUnique({
        where: { id: id as string },
        select: { id: true, logoPublicId: true }
    })
    if (!sponsor) {
        throw new ApiError(404, 'Sponsor not found')
    }

    const parsed = sponsorSchema.partial().safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }

    let logoUrl: string | undefined
    let logoPublicId: string | undefined
    if (req.file) {
        const upload = await uploadToCloudinary(req.file.buffer)
        logoUrl = upload.url
        logoPublicId = upload.publicId
    }

    const updated = await prisma.sponsor.update({
        where: { id: id as string },
        data: {
            ...parsed.data,
            ...(logoUrl && { logoUrl }),
            ...(logoPublicId && { logoPublicId }),
        },
    })

    if (req.file && sponsor.logoPublicId) {
        await destroyFromCloudinary(sponsor.logoPublicId)
    }

    res.json(new ApiResponse(200, updated, 'Sponsor updated successfully'))
})


export const deleteSponsor = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const existing = await prisma.sponsor.findUnique({
        where: { id: id as string },
        select: { id: true, logoPublicId: true }
    })
    if (!existing) {
        throw new ApiError(404, 'Sponsor not found')
    }

    if (existing.logoPublicId) {
        await destroyFromCloudinary(existing.logoPublicId)
    }

    await prisma.sponsor.delete({ where: { id: id as string } })

    res.json(new ApiResponse(200, null, 'Sponsor deleted successfully'))
})