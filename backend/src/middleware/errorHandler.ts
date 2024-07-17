import { Request, Response } from "express";
import { GenericResponse } from "../types/res";
import { CustomError } from "../lib/utils";
import { Constants } from "../Constants";
import { ZodError } from "zod";

export default async (
  error: Error,
  req: Request,
  res: Response<GenericResponse<any>>,
  next
) => {
  if (error instanceof CustomError) {
    return res.status(error.code).json({
      isSuccess: false,
      issues: [],
      message: error.message,
    });
  }
  if (error instanceof ZodError) {
    return res.status(Constants.VALIDATION_ERROR).json({
      isSuccess: false,
      issues: error.issues,
      message: error.message,
    });
  }
  return res.status(Constants.SERVER_ERROR).json({
    isSuccess: false,
    issues: [],
    message: error.message,
  });
};
