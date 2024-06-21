import { Request, Response } from "express";
import {
  CommentInsert,
  CommentSelect,
  commentInsertZodSchema,
  commentSelectSchema,
} from "../types/comment";
import CommentsModel, { CommentModel } from "../models/CommentsModel";
import { Constants } from "../Constants";
import z from "zod";
import { getUserDataById } from "../service/userService";
import { getReciepById } from "../service/recipeService";
import { Res } from "../types/res";
import { getCommentByCommentId, getCommentsByRecipeId } from "../service/commentService";

export const addComment = async (
  req: Request<unknown, unknown, CommentInsert>,
  res: Response
) => {
  try {
    const validComment = commentInsertZodSchema.parse(req.body);
    validComment.createdAt = new Date();
    const [user, recipe] = await Promise.all([
      getUserDataById(validComment.authorId),
      getReciepById(validComment.recipeId),
    ]);

    if (!user || !recipe) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: {
          message: "Either recipe or user not found",
        },
      });
    }
    const savedComment = await CommentsModel.create(validComment);
    if (savedComment) {
      return res.status(Constants.CREATED).json({
        isSuccess: true,
        data: {
          message: "Comment saved successfully",
          comment: savedComment,
        },
      });
    }
    return res.status(Constants.SERVER_ERROR).json({
      isSuccess: false,
      data: {
        message: "Someting went wrong",
      },
    });
  } catch (error) {
    if(error.code.toString() === "11000"){
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: {
          message: "duplicate comment",
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

export const editComment = async (
  req: Request<{ id: string }, unknown, CommentSelect>,
  res: Response
) => {
  try {
    const validComment = commentSelectSchema.parse(req.body);
    const id = req.params.id;
    const savedComment = await getCommentByCommentId(id);
    if (!savedComment) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: {
          message: `Comment with id ${id} does not exist`,
        },
      });
    }
    savedComment.body = validComment.body;
    const updatedComment = await savedComment.save();
  } catch (error) {
    return res.status(Constants.VALIDATION_ERROR).json({
      isSuccess: false,
      data: {
        message: error.message,
      },
    });
  }
};

export const deleteComment = async (
  req: Request<{ id: string }>,
  res: Response<Res<any>>
) => {
  try {
    const validId = z.string().parse(req.params.id);
    const comment = await getCommentByCommentId(validId);
    if (!comment) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: {
          message: "Comment not found",
        },
      });
    }
    const deletedComment = await CommentsModel.findByIdAndDelete(validId);
    if (!deleteComment) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: {
          message: "Comment not found",
        },
      });
    }
    return res.status(Constants.OK).json({
      isSuccess: true,
      data: {
        message: "Comment deleted successfully",
        result: deletedComment,
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

export const commentsByRecipeId = async (
  req: Request<{ id: string }, unknown>,
  res: Response<Res<CommentModel[]>>
) => {
  try {
    const recipe = await getReciepById(req.params.id);
    if (!recipe) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: {
          message: "Recipe not found",
        },
      });
    }
    const comments = await getCommentsByRecipeId(req.params.id);
    if (!comments) {
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: {
          message: "Comments not found",
        },
      });
    }
    return res.status(Constants.OK).json({
      isSuccess: true,
      data: {
        message: "Comments found",
        result: comments,
      },
    });
  } catch (error) {}
};
