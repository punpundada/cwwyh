import { Request, Response } from "express";
import {
  CommentInsert,
  CommentSelect,
  commentInsertZodSchema,
  commentSelectSchema,
} from "../types/comment";
import CommentsModel from "../models/CommentsModel";
import { Constants } from "../Constants";
import z from "zod";

export const addComment = async (
  req: Request<unknown, unknown, CommentInsert>,
  res: Response
) => {
  try {
    const validComment = commentInsertZodSchema.parse(req.body);
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
    const savedComment = await CommentsModel.findById(id);
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
  res: Response
) => {
  try {
    const validId = z.string().parse(req.params.id);
    const deletedComment = await CommentsModel.findByIdAndDelete(validId);
    if (!deleteComment) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: {
          message: "Comment was not deleted",
        },
      });
    }
    return res.status(Constants.OK).json({
      isSuccess: true,
      data: {
        message: "Comment deleted successfully",
        data: deletedComment,
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
