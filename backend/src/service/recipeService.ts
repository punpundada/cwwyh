import { getModifiedRecipe } from "../lib/recipe";
import { IngredientModel } from "../models/IngredientModel";
import RecipeModel, { RecipeType } from "../models/RecipeModel";
import User from "../models/UserModel";
import { RecipeSelectType, RecipeZodType } from "../types/recipe";

export default class RecipeService {
  static async getRecipeByNameAndUserId(name: string, userId: string) {
    return RecipeModel.findOne({
      recipeName: name,
      userId: userId,
    });
  }

  static async saveRecipe(recipe: RecipeZodType) {
    return RecipeModel.create(recipe);
  }

  static async deleteById(recipeId: string) {
    return RecipeModel.findByIdAndDelete({ _id: recipeId });
  }

  static async getAllRecipies(page: number, search: string) {
    const perPageItems = 9;
    let query = {} as any;
    let pageNumber = Math.abs(+page) - 1 ?? 0;
    if (pageNumber < 0) {
      pageNumber = 0;
    }
    const searchRecipe = search;
    if (searchRecipe) {
      const searchRecipeRegex = new RegExp(searchRecipe, "i");
      query.recipeName = { $regex: searchRecipeRegex };
    }

    const foundRecipes = await RecipeModel.find(query)
      .skip(perPageItems * pageNumber)
      .limit(perPageItems)
      ?.populate({
        path: "userId",
        model: User,
        select: ["firstName", "lastName"],
      })
      ?.populate({
        path: "ingredientsList.ingredientId",
        model: IngredientModel,
        select: ["ingredientName"],
      })
      ?.lean()
      ?.exec();

    const modifiedRecipes = foundRecipes?.map((recipe) => {
      return getModifiedRecipe(recipe);
    });
    return modifiedRecipes;
  }

  static async getRecipeById(recipeId: string) {
    const foundRecipe = await RecipeModel.findById(recipeId)
      .populate({
        path: "userId",
        model: User,
        select: ["firstName", "lastName"],
      })
      .populate({
        path: "ingredientsList.ingredientId",
        model: IngredientModel,
        select: ["ingredientName"],
      })
      .lean()
      .exec();
    return getModifiedRecipe(foundRecipe);
  }

  static async update(recipe: RecipeSelectType) {
    return await RecipeModel.updateOne({ _id: recipe._id }, recipe);
  }
}
