import { Router } from "express";
import RecipeController from "../controller/RecipeController";
import ValidateToken from "../middleware/ValidationTokenHandler";

const RecipieRouter = Router();

RecipieRouter.post("/add", ValidateToken, RecipeController.addRecipe);
RecipieRouter.post("/update/:id", ValidateToken, RecipeController.updateRecipe);
RecipieRouter.delete("/delete/:id", ValidateToken, RecipeController.deleteRecipe);
RecipieRouter.post("/getByIngredients", RecipeController.getRecipesByIngredients);
RecipieRouter.post("/image/add", ValidateToken, RecipeController.addRecipeImageUrl);
RecipieRouter.delete("/image/delete", ValidateToken, RecipeController.deleteOneImage);
RecipieRouter.get("/get", RecipeController.getAllRecipes);
RecipieRouter.get("/get/:id", RecipeController.getOneRecipe);

export default RecipieRouter;
