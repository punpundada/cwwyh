import { Router } from "express";
import { likeRecipe } from "../controller/LikeController";

export const likeRoute = Router();

likeRoute.post('/add',likeRecipe)