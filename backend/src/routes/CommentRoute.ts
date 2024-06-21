import { Router } from "express";
import {
  addComment,
  commentsByRecipeId,
  deleteComment,
  editComment,
} from "../controller/CommentController";

export const commentRoute = Router();

commentRoute.post("/add", addComment);
commentRoute.delete("/delete/:id", deleteComment);
commentRoute.post("/edit/:id", editComment);
commentRoute.get("/recipe/:id", commentsByRecipeId);
