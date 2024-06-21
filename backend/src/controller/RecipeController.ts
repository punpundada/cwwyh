import { Constants } from "../Constants";
import RecipeModel, {
  RecipeType,
} from "../models/RecipeModel";
import User from "../models/UserModel";
import { IngredientModel } from "../models/IngredientModel";
import DifficultyLevelModel from "../models/DifficultyLevel";
import { getModifiedRecipe } from "../lib/recipe";
import { Request, Response } from "express";
import { ReqUser } from "../types/user";
import { error } from "console";
import { ZodError } from "zod";
import { zodRecipeSchema } from "../types/recipe";

const addRecipe = async (
  req: Request<any, any, ReqUser<RecipeType>>,
  res: Response
) => {
  try {

    const {
      recipeName,
      userId,
      ingredientsList,
      description,
      difficultyLevel,
      imgUrls,
      prepTime,
      steps,
      userName,
    } = zodRecipeSchema.parse(req.body.reqBody);

    const foundRecipe = await RecipeModel.findOne({
      recipeName: recipeName,
      userId,
    });

    if (foundRecipe) {
      return res.status(Constants.FORBIDDEN).json({
        isSuccess: false,
        data: {
          message: `User with id: ${userId} has already Recipe with name: ${recipeName}`,
        },
      });
    }

    const newRecipe = await RecipeModel.create({
      recipeName: recipeName,
      userId,
      ingredientsList,
      description,
      prepTime,
      difficultyLevel,
      imgUrls,
      steps,
    });

    if (newRecipe) {
      return res.status(Constants.CREATED).json({
        isSuccess: true,
        data: { message: `New Recipe with id:${newRecipe?._id} is created ` },
      });
    } else {
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        data: { message: "Something went wrong" },
      });
    }
  } catch (error) {
    const errorMessages = JSON.parse(error.message).map(error => error.message);
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message:errorMessages , issues:error.issues} });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(Constants.VALIDATION_ERROR)
        .json({ isSuccess: false, data: { message: "Recipe id is required" } });
    }

    const deletadRecipe = await RecipeModel.findByIdAndDelete({ _id: id });
    if (deletadRecipe) {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: { message: `Recipe with ${deletadRecipe?._id} id Deletad` },
      });
    } else {
      return res
        .status(Constants.VALIDATION_ERROR)
        .json({ isSuccess: false, data: { message: "Recipe is not Deleted" } });
    }
  } catch (error) {
    return res
      .status(Constants.VALIDATION_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

const getRecipesByIngredients = async (req, res) => {
  const { ingredientsTosearch } = req.body;
  try {
    if (!ingredientsTosearch && !Array.isArray(ingredientsTosearch)) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "Ingredient List not found" },
      });
    }

    const recipes = await RecipeModel.find({
      "ingredientsList.ingredientId": { $all: ingredientsTosearch },
    });

    if (recipes && recipes.length !== 0) {
      return res
        .status(Constants.OK)
        .json({ isSuccess: true, data: { recipes, message: "Recipes found" } });
    } else {
      return res
        .status(Constants.NOT_FOUND)
        .json({ isSuccess: false, data: { message: "Recipes not found" } });
    }
  } catch (error) {
    return res
      .status(Constants.SERVER_ERROR)
      .json({ isSuccess: false, data: { message: error.message } });
  }
};

//call this method only when  a recipe is already pressent and you want to add images
const addRecipeImageUrl = async (req, res) => {
  const { newImgUrls, recipeId } = req.body;
  if (
    !newImgUrls ||
    !recipeId ||
    !Array.isArray(newImgUrls) ||
    newImgUrls.length === 0
  ) {
    return res.status(Constants.VALIDATION_ERROR).json({
      isSuccess: false,
      data: { message: "Image URLs and Recipe Id is a Required Field" },
    });
  }

  try {
    const foundRecipe = await RecipeModel.findById(recipeId);

    if (!foundRecipe) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: "Recipe Not Found" },
      });
    }

    const updatedUrls = [...foundRecipe.imgUrls, ...newImgUrls];

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      { _id: recipeId },
      { imgUrls: updatedUrls },
      { new: true }
    );

    if (updatedRecipe) {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: { recipe: updatedRecipe, message: "Recipe Image URL updated" },
      });
    } else {
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        data: { message: "Recipe Image URL not updated" },
      });
    }
  } catch (error) {
    return res.status(Constants.SERVER_ERROR).json({
      isSuccess: false,
      data: { message: error.message },
    });
  }
};

const deleteOneImage = async (req, res) => {
  const { recipeId, imageId } = req.body;
  if (!recipeId || !imageId) {
    return res.status(Constants.VALIDATION_ERROR).json({
      isSuccess: false,
      data: { message: "Image Id and Recipe Id required" },
    });
  }

  try {
    const foundRecipe = await RecipeModel.findById(recipeId);

    // const ad = foundRecipe.

    if (!foundRecipe) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: `Recipe with ${recipeId} not Found required` },
      });
    }

    let imageIndex = 1;
    // const imageIndex = foundRecipe.imgUrls.findIndex((img) => {
    //   return img._id.toString() === imageId;
    // });

    if (imageIndex === -1) {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: `Image not found` },
      });
    }

    foundRecipe.imgUrls.splice(imageIndex, 1);

    foundRecipe.save();

    return res.status(Constants.OK).json({
      isSuccess: true,
      data: { message: `Image deleted successfully` },
    });
  } catch (error) {
    return res.status(Constants.SERVER_ERROR).json({
      isSuccess: false,
      data: { message: error.message },
    });
  }
};

const getAllRecipes = async (req, res) => {
  const perPageItems = 9;
  try {
    let query = {} as any;
    const pageNumber = Math.abs(req.query.page) || 0;
    const searchRecipe = req.query.search;
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
      ?.populate({
        path: "difficultyLevel",
        model: DifficultyLevelModel,
        select: ["level"],
      })
      ?.lean()
      ?.exec();

    const modifiedRecipes = foundRecipes?.map((recipe) => {
      return getModifiedRecipe(recipe);
    });

    if (modifiedRecipes) {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: { recipes: modifiedRecipes, message: `Recipe Found` },
      });
    } else {
      return res.status(Constants.FORBIDDEN).json({
        isSuccess: false,
        data: { message: `Recipe Not Found` },
      });
    }
  } catch (error) {
    console.error(error)
    return res.status(Constants.SERVER_ERROR).json({
      isSuccess: false,
      data: { message: error.message },
    });
  }
};

const getOneRecipe = async (req, res) => {
  const recipeId = req.params.id;
  try {
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
      .populate({
        path: "difficultyLevel",
        model: DifficultyLevelModel,
        select: ["level"],
      })
      .lean()
      .exec();

    const modifiedRecipe = getModifiedRecipe(foundRecipe);

    if (modifiedRecipe) {
      return res.status(Constants.OK).json({
        isSuccess: true,
        data: { recipes: modifiedRecipe, message: `Recipe Found` },
      });
    } else {
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: `Recipe not Found` },
      });
    }
  } catch (error) {
    return res.status(Constants.SERVER_ERROR).json({
      isSuccess: false,
      data: { message: error.message },
    });
  }
};

export {
  addRecipe,
  deleteRecipe,
  getRecipesByIngredients,
  addRecipeImageUrl,
  deleteOneImage,
  getAllRecipes,
  getOneRecipe,
};
