import { Router } from "express";
import ValidateToken from "../middleware/ValidationTokenHandler.js";
import { addCuisine, getAllCuisine, updateCuisine, deleteCuisine } from "../controller/CuisineController.js";
const cuisineRouter = Router();
cuisineRouter.post("/add", addCuisine);
cuisineRouter.get("/getAll", ValidateToken, getAllCuisine);
cuisineRouter.post("/update", ValidateToken, updateCuisine);
cuisineRouter.delete('/delete/:cousineId', ValidateToken, deleteCuisine);
export default cuisineRouter;
//# sourceMappingURL=CuisineRoute.js.map