import { Router } from "express";
import { addOneIngredient, getAllIngredients, deleteIngredient, updateIngredient } from "../controller/IngredientController.js";
import ValidateToken from "../middleware/ValidationTokenHandler.js";

const IngredientRouter = Router();

IngredientRouter.post("/addOne", ValidateToken,addOneIngredient);
IngredientRouter.get("/get",ValidateToken, getAllIngredients);
IngredientRouter.delete("/delete/:id",ValidateToken, deleteIngredient);
IngredientRouter.put("/update",ValidateToken, updateIngredient);

export default IngredientRouter;
