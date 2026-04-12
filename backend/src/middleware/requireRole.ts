import { Request, Response, NextFunction } from 'express'
import { Role } from '@prisma/client'
import { ApiError } from '../utils/ApiError.js'

export const requireRole = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    
    if (!req.user) {
      throw new ApiError(401, 'Not authenticated')
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'You do not have permission to perform this action')
    }

    next()
  }
}