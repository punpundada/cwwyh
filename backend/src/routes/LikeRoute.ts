import { Router } from "express";
import { likeCount, likeRecipe, removeLike } from "../controller/LikeController";

export const likeRoute = Router();

likeRoute.post('/add',likeRecipe)
likeRoute.post('/remove',removeLike)
likeRoute.get('/count/recipe/:recipeId',likeCount)