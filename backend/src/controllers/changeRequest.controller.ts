import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const createRequestSchema = z.object({
    section: z.string().min(2),       
    description: z.string().min(10), 
})

const resolveRequestSchema = z.object({
    status: z.enum(['APPROVED', 'REJECTED']),
    adminNote: z.string().optional(), 
})


export const createChangeRequest = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createRequestSchema.safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed')
    }

    const changeRequest = await prisma.changeRequest.create({
        data: {
            ...parsed.data,
            requestedBy: req.user!.id,
        },
    })

    res.status(201).json(new ApiResponse(201, changeRequest, 'Change request submitted successfully'))
})


export const getChangeRequests = asyncHandler(async (req: Request, res: Response) => {
    const isAdmin = req.user!.role === 'ADMIN'

    const changeRequests = await prisma.changeRequest.findMany({
        where: isAdmin
            ? undefined  
            : { requestedBy: req.user!.id },    
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: { id: true, name: true, email: true }
            }
        }
    })

    res.json(new ApiResponse(200, changeRequests, 'Change requests fetched successfully'))
})


export const resolveChangeRequest = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const existing = await prisma.changeRequest.findUnique({
        where: { id: id as string },
        select: { id: true, status: true }
    })
    if (!existing) {
        throw new ApiError(404, 'Change request not found')
    }

    if (existing.status !== 'PENDING') {
        throw new ApiError(400, 'This request has already been resolved')
    }

    const parsed = resolveRequestSchema.safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed')
    }

    const updated = await prisma.changeRequest.update({
        where: { id: id as string },
        data: {
            status: parsed.data.status,
            adminNote: parsed.data.adminNote,
            resolvedAt: new Date(), 
        },
    })

    res.json(new ApiResponse(200, updated, `Change request ${parsed.data.status.toLowerCase()} successfully`))
})