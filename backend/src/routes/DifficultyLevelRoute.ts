import { Router } from "express";
import { addLevel, getAllLevels } from "../controller/DifficultyLevelController";

const DifficuiltyLevelRoute = Router();

DifficuiltyLevelRoute.post("/add", addLevel);
DifficuiltyLevelRoute.get("/getAll", getAllLevels);

export default DifficuiltyLevelRoute;
