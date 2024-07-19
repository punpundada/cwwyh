import { Router } from "express";
import RecipeController from "../controller/RecipeController";
import ValidateToken, { getUserFromToken } from "../middleware/ValidationTokenHandler";


const RecipieRouter = Router();

RecipieRouter.post("/add", ValidateToken, RecipeController.addRecipe);
RecipieRouter.post("/update/:id", ValidateToken, RecipeController.updateRecipe);
RecipieRouter.delete("/delete/:id", ValidateToken, RecipeController.deleteRecipe);
RecipieRouter.post("/getByIngredients", RecipeController.getRecipesByIngredients);
RecipieRouter.post("/image/add", ValidateToken, RecipeController.addRecipeImageUrl);
RecipieRouter.delete("/image/delete", ValidateToken, RecipeController.deleteOneImage);
RecipieRouter.get("/get",getUserFromToken,RecipeController.getAllRecipes as any);
RecipieRouter.get("/get/:id", getUserFromToken,RecipeController.getOneRecipe);
RecipieRouter.get("/get-card-list", getUserFromToken,RecipeController.getRecipeCardList as any);

export default RecipieRouter;
