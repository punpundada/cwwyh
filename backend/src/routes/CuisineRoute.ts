import { Router } from "express";
import ValidateToken from "../middleware/ValidationTokenHandler";
import { addCuisine, getAllCuisine, updateCuisine, deleteCuisine } from "../controller/CuisineController";
const cuisineRouter = Router();

cuisineRouter.post("/add", addCuisine);
cuisineRouter.get("/getAll",ValidateToken, getAllCuisine);
cuisineRouter.post("/update", ValidateToken,updateCuisine);
cuisineRouter.delete('/delete/:id',ValidateToken,  deleteCuisine);

export default cuisineRouter;
