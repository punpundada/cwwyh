import { Request, Response } from "express";
import { Constants } from "../Constants";
import LikeService from "../service/likeService";
import { GenericResponse } from "../types/res";
import { CustomError } from "../lib/utils";

export const likeRecipe = async (
  req: Request<unknown, unknown, { userId: string; recipeId: string }>,
  res: Response<GenericResponse<boolean>>,
  next
) => {
  try {
    req.body.userId = res.locals.id;
    const savedLike = await LikeService.like(req.body);
    if (!savedLike) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        issues: [],
        message: "Request was unsuccessful",
      });
    }
    return res.status(Constants.OK).json({
      isSuccess: true,
      message: "Request was successful",
      result: true,
    });
  } catch (error) {
    if (error.code.toString() === "11000" && error instanceof Error) {
      const err = new CustomError("Duplicate like", Constants.VALIDATION_ERROR);
      next(err);
    }
    next(error);
  }
};

export const removeLike = async (
  req: Request<unknown, unknown, { userId: string; recipeId: string }>,
  res: Response<GenericResponse<boolean>>,
  next
) => {
  try {
    req.body.userId = res.locals.id;
    const deletedLike = await LikeService.unkile(req.body);
    if (!deletedLike) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        issues: [],
        message: "Request failed",
      });
    }
    return res.status(Constants.OK).json({
      isSuccess: true,
      message: "Request was successful",
      result: true,
    });
  } catch (error) {
    next(error);
  }
};

export const likeCount = async (
  req: Request<{ recipeId: string }>,
  res: Response<GenericResponse<number>>,
  next
) => {
  try {
    const count = await LikeService.getLikeCount(req.params.recipeId);
    return res.status(Constants.OK).json({
      isSuccess: true,
      message: "Request was successful",
      result: count ?? 0,
    });
  } catch (error) {
    next(error);
  }
};
