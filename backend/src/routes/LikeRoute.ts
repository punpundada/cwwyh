import { Router } from "express";
import { likeCount, likeRecipe, removeLike } from "../controller/LikeController";
import ValidateToken from "../middleware/ValidationTokenHandler";

export const likeRoute = Router();

likeRoute.post('/add',ValidateToken,likeRecipe)
likeRoute.post('/remove',ValidateToken,removeLike)
likeRoute.get('/count/recipe/:recipeId',likeCount)