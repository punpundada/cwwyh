import { Router } from "express";
import { addLevel, getAllLevels } from "../controller/DifficultyLevelController.js";
const DifficuiltyLevelRoute = Router();
DifficuiltyLevelRoute.post("/add", addLevel);
DifficuiltyLevelRoute.get("/getAll", getAllLevels);
export default DifficuiltyLevelRoute;
//# sourceMappingURL=DifficultyLevelRoute.js.map