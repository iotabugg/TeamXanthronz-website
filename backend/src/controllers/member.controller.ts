import { Request, Response } from "express";
import { z } from "zod";
import { uploadToCloudinary, destroyFromCloudinary } from "../lib/cloudinary.js"
import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const memberSchema = z.object({
    name: z.string().min(2),
    role: z.string().min(2),
    department: z.string().min(2),
    year: z.coerce.number().int().min(2018),
    github: z.string().optional().or(z.literal('')),
    linkedIn: z.string().optional().or(z.literal('')),
    email: z.email().optional().or(z.literal('')),
    skills: z.preprocess((val) => {
    try {
        return typeof val === 'string' ? JSON.parse(val) : val
    } catch {
        return val 
    }
    }, z.array(z.string()))
})

export const getMembers = asyncHandler(async(req: Request, res: Response) => {
    const year = req.query.year ? Number(req.query.year) : undefined

    const members = await prisma.member.findMany({
        where: year ? { year } : undefined,
        orderBy: { createdAt : 'asc'}
    })

    res.json(
        new ApiResponse(200, members, 'Members fetched successfully')
    )
})

export const createMember = asyncHandler(async(req: Request, res: Response) => {
    const parsed = memberSchema.safeParse(req.body)

    if(!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }
    let imgUrl : string | undefined
    let imgPublicId : string | undefined
    if(req.file) {
        const upload = await uploadToCloudinary(req.file.buffer)
        imgUrl = upload.url
        imgPublicId = upload.publicId
    }
    const member = await prisma.member.create({
        data: { ...parsed.data, imgUrl, imgPublicId },
    })

    res.status(201).json(
        new ApiResponse(201, member, 'Member created successfully')
    )
})

export const updateMember = asyncHandler(async (req:Request, res: Response) => {
    const { id } = req.params
    const member = await prisma.member.findUnique( {where: { id: id as string }, select: { id: true, imgUrl: true, imgPublicId: true }} )
    if(!member) {
        throw new ApiError(404, 'Member Not found')
    }
    const parsed = memberSchema.partial().safeParse(req.body)
    if(!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }

    // Upload new image first (before touching DB or deleting old image)
    let imgUrl: string | undefined
    let imgPublicId: string | undefined
    if(req.file) {
        const upload = await uploadToCloudinary(req.file.buffer)
        imgUrl = upload.url
        imgPublicId = upload.publicId
    }

    // Update DB — if this fails, old image is still intact on Cloudinary
    const updated = await prisma.member.update({
        where: { id: id as string },
        data: { ...parsed.data, ...(imgUrl && { imgUrl }), ...(imgPublicId && { imgPublicId })},
    })

    // Only delete old image AFTER DB update succeeds
    if(req.file && member.imgPublicId) {
        await destroyFromCloudinary(member.imgPublicId)
    }

    res.json(
        new ApiResponse(200, updated, 'Member updated successfully')
    )
})

export const deleteMember = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
 
  const existing = await prisma.member.findUnique({ where: { id: id as string }, select: { id: true, imgPublicId: true } })
  if (!existing) {
    throw new ApiError(404, 'Member not found')
  }
  
  if(existing.imgPublicId) {
    await destroyFromCloudinary(existing.imgPublicId)
  }

  await prisma.member.delete({ where: { id: id as string } })
 
  res.json(new ApiResponse(200, null, 'Member deleted successfully'))
})