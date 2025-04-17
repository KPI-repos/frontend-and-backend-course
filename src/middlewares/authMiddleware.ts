import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "@/utils/AppError";

interface DecodedPayload {
  userId: string;
  iat: number;
  exp: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError("Authorization header is missing", 401);
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AppError("Token is missing", 401);
    }
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as DecodedPayload;
    (req as any).userId = decoded.userId;

    next();
  } catch (error) {
    next(new AppError("Unauthorized", 401));
  }
}
