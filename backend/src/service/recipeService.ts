import { log } from "console";
import { getModifiedRecipe } from "../lib/recipe";
import { IngredientModel } from "../models/IngredientModel";
import MeasurementModel from "../models/MeasurementModel";
import RecipeModel, { RecipeType } from "../models/RecipeModel";
import User from "../models/UserModel";
import { RecipeCard, RecipeSelectType, RecipeZodType } from "../types/recipe";
import LikesModel from "../models/LikesModel";

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

  static async getAllRecipies(page: number, search: string, userId?: string) {
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
      ?.skip(perPageItems * pageNumber)
      ?.limit(perPageItems)
      ?.sort({ createdAt: -1 })
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
      ?.populate({
        path: "ingredientsList.measurement",
        model: MeasurementModel,
        select: ["name", "type", "_id"],
      })
      ?.lean()
      ?.exec();

    const modifiedRecipes = foundRecipes?.map((recipe) => {
      return getModifiedRecipe(recipe);
    });

    const likesArrPromise = modifiedRecipes.map(async (recipe) => {
      return LikesModel.getLikeCountByRecipeId(recipe._id);
    });

    let isLikedList = [];

    if (userId) {
      const isLikedPromise = modifiedRecipes.map((recipe) =>
        LikesModel.exists({ userId, recipeId: recipe._id })
      );
      isLikedList = await Promise.all(isLikedPromise);
    }

    const likesArr = await Promise.all(likesArrPromise);

    return modifiedRecipes.map((x, i) => ({
      ...x,
      likesCount: likesArr[i],
      isLiked: !!isLikedList[i],
    }));
  }

  static async getRecipeById(recipeId: string, userId?: string) {
    const foundRecipe = await RecipeModel.findById(recipeId)
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
      ?.populate({
        path: "ingredientsList.measurement",
        model: MeasurementModel,
        select: ["name", "type", "_id"],
      })
      ?.lean()
      ?.exec();
    const likesCount = await LikesModel.getLikeCountByRecipeId(recipeId);
    let isLiked = false;
    if (userId) {
      isLiked = !!(await LikesModel.exists({ userId, recipeId }));
    }
    const recipe = getModifiedRecipe(foundRecipe);
    return { ...recipe, likesCount, isLiked };
  }

  static async update(recipe: RecipeSelectType) {
    return await RecipeModel.updateOne({ _id: recipe._id }, recipe);
  }

  static async getCardList(page: number, search: string, userId?: string) {
    const perPageItems = 9;
    let query = {} as any;
    let pageNumber = Math.floor(+page) - 1 ?? 0;
    if (pageNumber < 0) {
      pageNumber = 0;
    }
    const searchRecipe = search;
    if (searchRecipe) {
      const searchRecipeRegex = new RegExp(searchRecipe, "i");
      query.recipeName = { $regex: searchRecipeRegex };
    }

    const foundRecipes = await RecipeModel.find(query)
      .select(["_id", "description", "recipeName", "imgUrls.imgUrl", "userId"])
      ?.skip(perPageItems * pageNumber)
      ?.limit(perPageItems)
      ?.sort({ createdAt: -1 })
      ?.populate({
        path: "userId",
        model: User,
        select: ["firstName", "lastName"],
      })
      ?.lean()
      ?.exec();

    const likeCountsPromise = foundRecipes.map((recipe) =>
      LikesModel.getLikeCountByRecipeId(recipe._id)
    );

    const likesCount = await Promise.all(likeCountsPromise);

    let isLikedList = [];
    if (userId) {
      const isLikedPromise = foundRecipes.map((recipe) =>
        LikesModel.exists({ userId, recipeId: recipe._id })
      );

      isLikedList = await Promise.all(isLikedPromise);
    }

    const data = foundRecipes
      .map((x, i) => ({
        ...x,
        likesCount: likesCount[i] ?? 0,
        isLiked: !!isLikedList[i],
      }))
      .map((x) => RecipeCard.parse(x));
    return data;
  }
}
