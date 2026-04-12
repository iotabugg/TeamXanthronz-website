import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import multer from "multer";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors
        });
        return;
    }

    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({
                success: false,
                message: 'File size is too large. Maximum allowed size is 300KB.',
                errors: []
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: err.message,
            errors: []
        });
        return;
    }

    console.error("[Unhandled Error]", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
};