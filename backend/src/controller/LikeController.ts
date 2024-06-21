import { Request, Response } from "express";
import LikesModel from "../models/LikesModel";
import { Constants } from "../Constants";

export const likeRecipe = async (
  req: Request<unknown, unknown, { userId: string; recipeId: string }>,
  res: Response
) => {
  try {
    const savedLike = await LikesModel.create(req.body);
    if (!savedLike) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: {
          message: "Like was not saved",
        },
      });
    }
    return res.status(Constants.OK).json({
      isSuccess: true,
      data: {
        message: "Like saved successfully",
      },
    });
  } catch (error) {
    return res.status(Constants.SERVER_ERROR).json({
      isSuccess: false,
      data: {
        message: error.message,
      },
    });
  }
};

export const removeLike = async (
  req: Request<unknown, unknown, { userId: string; recipeId: string }>,
  res: Response
) => {
  try {
    const deletedLike = await LikesModel.findOneAndDelete(req.body);
    if (!deletedLike) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: {
          message: "Like was not deleted",
        },
      });
    }
    return res.status(Constants.OK).json({
      isSuccess: true,
      data: {
        message: "Like deleted successfully",
      },
    });
  } catch (error) {
    return res.status(Constants.SERVER_ERROR).json({
      isSuccess: false,
      data: {
        message: error.message,
      },
    });
  }
};
