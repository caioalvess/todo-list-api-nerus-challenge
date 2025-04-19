import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        res.status(404).json({ message: "Record not found in the database." });
        return;
      case "P2002":
        res
          .status(409)
          .json({ message: "A record with this unique value already exists." });
        return;
      default:
        res
          .status(500)
          .json({ message: "Internal error accessing the database." });
        return;
    }
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation error.",
      errors: error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({
      message: error.message || "Unexpected error. Please try again later.",
    });
    return;
  }

  res.status(500).json({ message: "Unknown error. Please try again later." });
};
