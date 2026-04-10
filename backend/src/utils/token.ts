import jwt, { SignOptions } from "jsonwebtoken";
import { ApiError } from "./ApiError.js";

export type TokenPayload = {
    userId: string;
    role: "ADMIN" | "MEMBER";
};

export const generateAccessToken = (payload: TokenPayload): string => {

    const secret = process.env.JWT_SECRET;
    const expiresIn =
        process.env.JWT_EXPIRES_IN || "10m";

    if (!secret) {
        throw new ApiError(500, "JWT_SECRET not available");
    }

    return jwt.sign(payload, secret as string, {
        expiresIn
    } as SignOptions);
};

export const generateRefreshToken = (payload: TokenPayload): string => {

    const secret = process.env.JWT_REFRESH_SECRET;
    const expiresIn =
        process.env.JWT_REFRESH_EXPIRES_IN || "7d";

    if (!secret) {
        throw new ApiError(500, "JWT_REFRESH_SECRET not available");
    }

    return jwt.sign(payload, secret as string, {
        expiresIn
    } as SignOptions);
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
  } catch {
    return null
  }
}

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as TokenPayload
  } catch {
    return null
  }
}