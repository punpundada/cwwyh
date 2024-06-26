import { Router } from 'express';
import { addRecipe, deleteRecipe, getRecipesByIngredients, addRecipeImageUrl, deleteOneImage, getAllRecipes, getOneRecipe } from '../controller/RecipeController';
import ValidateToken from '../middleware/ValidationTokenHandler';

const RecipieRouter = Router();

RecipieRouter.post('/add',ValidateToken, addRecipe)
RecipieRouter.delete('/delete/:id',ValidateToken,  deleteRecipe);
RecipieRouter.post('/getByIngredients',getRecipesByIngredients);
RecipieRouter.post('/image/add', ValidateToken,addRecipeImageUrl)
RecipieRouter.delete('/image/delete',ValidateToken,deleteOneImage)
RecipieRouter.get('/get',getAllRecipes) 
RecipieRouter.get('/get/:id', getOneRecipe)  


export default RecipieRouter

