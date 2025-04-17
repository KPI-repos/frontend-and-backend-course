import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AppError } from "@/utils/AppError";
//
export const validateRequest =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      // // Debug logging
      // console.log("Validation middleware - Request details:", {
      //   method: req.method,
      //   url: req.url,
      //   headers: req.headers,
      //   body: req.body,
      //   contentType: req.headers["content-type"],
      // });

      // // Check if the request has a body
      // if (!req.body || Object.keys(req.body).length === 0) {
      //   throw new AppError("Request body is empty", 400);
      // }

      // Validate the schema
      const validatedData = schema.parse(req.body);

      // Replace req.body with validated data
      req.body = validatedData;

      next();
    } catch (error: any) {
      if (error.name === "ZodError") {
        next(new AppError("Invalid input data", 400, error.errors));
      } else if (error instanceof AppError) {
        next(error);
      } else {
        console.error("Validation error:", error);
        next(new AppError("Invalid request format", 400));
      }
    }
  };
