import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/ApiError.js"
import { verifyAccessToken } from "../utils/token.js"


export const authenticate = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, "No Access Token Provided.")
    }
    const token = authHeader.split(' ')[1]

    const payload = verifyAccessToken(token)
    if(!payload) {
        throw new ApiError(401, "Unauthorized!! Access Denied.")
    }
    req.user = {
        id: payload.userId,
        role: payload.role
    }
    next()
}