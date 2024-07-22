import { Router } from "express";
import LikeController from "../controller/LikeController";
import ValidateToken from "../middleware/ValidationTokenHandler";

export const likeRoute = Router();

likeRoute.post('/add',ValidateToken,LikeController.likeRecipe)
likeRoute.post('/remove',ValidateToken,LikeController.removeLike)
likeRoute.get('/toggle/:recipeId',ValidateToken,LikeController.toggleLike)
likeRoute.get('/count/recipe/:recipeId',LikeController.likeCount)