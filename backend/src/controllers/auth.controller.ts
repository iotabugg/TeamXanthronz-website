import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { z } from "zod"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import prisma from "../lib/prisma.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/token.js"



const registerSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
})

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
})

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 7*24*60*60*1000
}

export const register = asyncHandler(async (req: Request, res: Response) => {
    const parsed = registerSchema.safeParse(req.body)

    if(!parsed.success) {
        throw new ApiError(400, 'Validation Failed.', parsed.error.issues)
    }
    const { name, email, password } = parsed.data
    if(!name || !email || !password ) {
        throw new ApiError(400, "All fields are required.")
    }

    const existingUser = await prisma.user.findUnique({where: {email}})

    if(existingUser) {
        throw new ApiError(409, "user already exists")
    }
    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data: { name, email, passwordHash }, 
        select: { id: true, name: true, email: true, role: true, createdAt: true},
    })

    res.status(201).json(new ApiResponse(201, user, 'Account created successfully.'))
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body)
    if(!parsed.success) {
        throw new ApiError(400, 'Validation Failed.')
    }
    const { email, password } = parsed.data
    const user = await prisma.user.findUnique({ where: { email }})
    const dummyHash = '$2b$12$invalidhashfortimingprotection000000000000000000000000'

    const passwordMatch = await bcrypt.compare(
        password,
        user?.passwordHash ?? dummyHash
    )
    if(!user || !passwordMatch ) {
        throw new ApiError(401, 'Invalid email or password')
    }
    const accessToken = generateAccessToken({userId: user.id, role: user.role})
    const refreshToken = generateRefreshToken({userId: user.id, role: user.role})

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }
    })
    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS)
    res.json(
        new ApiResponse(200, {
            accessToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        }, 'Logged in successfully.')
    )
})

export const logout = asyncHandler( async ( req: Request, res: Response ) => {
    const token = req.cookies?.refreshToken as string | undefined

    if(token) {
        await prisma.user.updateMany({
            where: { refreshToken: token },
            data: {refreshToken: null},
        })
    }
    res.clearCookie('refreshToken', REFRESH_COOKIE_OPTIONS)

    res.status(200).json(new ApiResponse(200, null, 'Logged out successfully.'))
})

export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken as string | undefined

    if(!token) {
        throw new ApiError(401, 'No refresh token present')
    }
    const payload = verifyRefreshToken(token)
    if(!payload) {
        throw new ApiError(401, 'Invalid or expired refresh Token')
    }
    const user = await prisma.user.findUnique({ where: { id: payload.userId }})
    if(!user || user.refreshToken !== token) {
        throw new ApiError(401, 'Refresh token has been revoked')
    }
    const newAccessToken = generateAccessToken({ userId: user.id, role: user.role })
    res.json(new ApiResponse(200, { accessToken: newAccessToken }, 'Token Refreshed.'))
})

export const getMe = asyncHandler( async (req: Request, res:Response) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user?.id},
        select:{
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        }
    })
    if (!user) {
        throw new ApiError(404, 'User not found')
    }
 
    res.json(new ApiResponse(200, user, 'User fetched successfully'))
})