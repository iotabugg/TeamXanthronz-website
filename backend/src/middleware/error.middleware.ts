import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if(err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message : err.message,
            errors : err.errors
        });
        return;
    }
    console.error("[Unhandled Error", err);
    res.status(500).json({ success : false, message: "Internal Server Error"});
};
