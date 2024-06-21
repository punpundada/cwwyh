import { Request, Response } from "express";
import LikesModel from "../models/LikesModel";
import { Constants } from "../Constants";
import { getLikeCount } from "../service/likeService";
import { Res } from "../types/res";

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
    if(error.code.toString() === '11000' ){
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: {
          message: "Duplicate like by user",
        },
      })
    }
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
          message: "Like was not deleted or not found",
        },
      });
    }
    return res.status(Constants.OK).json({
      isSuccess: true,
      data: {
        message: "Like removed successfully",
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

export const likeCount = async (
  req: Request<{ recipeId: string }>,
  res: Response<Res<number>>
) => {
  try {
    const count = await getLikeCount(req.params.recipeId);
    return res.status(Constants.OK).json({
      isSuccess: true,
      data: { message: "Request was success", result: count },
    });
  } catch (error) {
    console.error(error);
    return res.status(Constants.VALIDATION_ERROR).json({
      isSuccess: false,
      data: {
        message: error.message,
      },
    });
  }
};
