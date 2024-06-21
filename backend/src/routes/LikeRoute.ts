import { Router } from "express";
import { likeRecipe, removeLike } from "../controller/LikeController";

export const likeRoute = Router();

likeRoute.post('/add',likeRecipe)
likeRoute.post('/remove',removeLike)