import { Constants } from "../Constants";
import RecipeModel from "../models/RecipeModel";
import { NextFunction, Request, Response } from "express";
import { RecipeSelectType, RecipeZodType, zodRecipeSchema } from "../types/recipe";
import RecipeService from "../service/recipeService";
import { GenericResponse } from "../types/res";

export default class RecipeController {
  static addRecipe = async (req: Request<any, any, RecipeZodType>, res: Response) => {
    try {
      req.body.userId = res.locals.id;

      const validRecipe = zodRecipeSchema.parse(req.body);

      const foundRecipe = await RecipeService.getRecipeByNameAndUserId(
        validRecipe.recipeName,
        validRecipe.userId
      );

      if (foundRecipe) {
        return res.status(Constants.FORBIDDEN).json({
          isSuccess: false,
          data: {
            message: `User has already Recipe with name: ${validRecipe.recipeName}`,
          },
        });
      }

      const newRecipe = await RecipeService.saveRecipe(validRecipe);

      if (newRecipe) {
        return res.status(Constants.CREATED).json({
          isSuccess: true,
          data: { message: `New Recipe with id:${newRecipe?._id} is created ` },
        });
      }
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        data: { message: "Something went wrong" },
      });
    } catch (error) {
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        data: { message: error.message, issues: error.issues },
      });
    }
  };

  static deleteRecipe = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(Constants.VALIDATION_ERROR)
          .json({ isSuccess: false, data: { message: "Recipe id is required" } });
      }

      const deletadRecipe = await RecipeService.deleteById(id);
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

  static getRecipesByIngredients = async (req, res) => {
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
  static addRecipeImageUrl = async (req, res) => {
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

  static deleteOneImage = async (req, res) => {
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
  static getAllRecipes = async (
    req: Request<unknown, unknown, unknown, { page: number; search: string }>,
    res
  ) => {
    try {
      const modifiedRecipes = await RecipeService.getAllRecipies(
        req.query.page,
        req.query.search
      );

      if (modifiedRecipes) {
        return res.status(Constants.OK).json({
          isSuccess: true,
          data: { recipes: modifiedRecipes, message: `Request was successfull` },
        });
      }
      return res.status(Constants.NOT_FOUND).json({
        isSuccess: false,
        data: { message: `Recipe Not Found` },
      });
    } catch (error) {
      console.error(error);
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        data: { message: error.message },
      });
    }
  };
  static getOneRecipe = async (req: Request<{ id: string }>, res) => {
    const recipeId = req.params.id;
    try {
      const modifiedRecipe = await RecipeService.getRecipeById(recipeId);

      if (modifiedRecipe) {
        return res.status(Constants.OK).json({
          isSuccess: true,
          data: { recipes: modifiedRecipe, message: `Recipe Found` },
        });
      }
      return res.status(Constants.VALIDATION_ERROR).json({
        isSuccess: false,
        data: { message: `Recipe not Found` },
      });
    } catch (error) {
      return res.status(Constants.SERVER_ERROR).json({
        isSuccess: false,
        data: { message: error.message },
      });
    }
  };

  static updateRecipe = async (
    req: Request<{ id: string }, unknown, RecipeSelectType>,
    res: Response<GenericResponse<RecipeSelectType>>,
    next: NextFunction
  ) => {
    try {
      if (req.params.id !== req.body._id) {
        return res.status(Constants.VALIDATION_ERROR).json({
          isSuccess: false,
          issues: [],
          message: "Invalid ids",
        });
      }

      const data = await RecipeService.update(req.body);
      console.log(data);
      if (data) {
        return res.status(Constants.OK).json({
          isSuccess: true,
          message: "Recipe Updated",
          result: data as any,
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
