import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from 'bcrypt';
import prisma from "../lib/prisma.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const updateProfileSchema = z.object({
    name: z.string().min(2).optional(),
})

const updateRoleSchema = z.object({
    role: z.enum(['MEMBER', 'GUEST']),
})

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string().min(1),
}).refine(
    (data) => data.newPassword === data.confirmNewPassword,
    {
        message: 'Passwords do not match',
        path: ['confirmNewPassword'], 
    }
)

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        }
    })

    res.json(new ApiResponse(200, users, 'Users fetched successfully'))
})

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateProfileSchema.safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed')
    }

    const updated = await prisma.user.update({
        where: { id: req.user!.id },
        data: {
            ...parsed.data
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        }
    })
    res.json(new ApiResponse(200, updated, 'Profile updated successfully'))
})

export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const existing = await prisma.user.findUnique({
        where: { id: id as string },
        select: { id: true, role: true }
    })
    if (!existing) {
        throw new ApiError(404, 'User not found')
    }

    if (existing.role === 'ADMIN') {
        throw new ApiError(403, 'Cannot change the role of an ADMIN user')
    }

    const parsed = updateRoleSchema.safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }

    const updated = await prisma.user.update({
        where: { id: id as string },
        data: { role: parsed.data.role },
        select: { id: true, name: true, email: true, role: true }
    })

    res.json(new ApiResponse(200, updated, 'User role updated successfully'))
})

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
    const parsed = changePasswordSchema.safeParse(req.body)
    if (!parsed.success) {
        throw new ApiError(400, 'Validation failed', parsed.error.issues)
    }

    const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: { id: true, passwordHash: true }
    })
    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    const isMatch = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash)
    if (!isMatch) {
        throw new ApiError(401, 'Incorrect current password.')
    }

    const newPasswordHash = await bcrypt.hash(parsed.data.newPassword, 12)

    await prisma.user.update({
        where: { id: user.id },
        data: {
            passwordHash: newPasswordHash,
            refreshToken: null,
        }
    })

    res.json(new ApiResponse(200, null, 'Password changed successfully. Please log in again.'))
})
