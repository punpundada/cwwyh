import RecipeModel, { RecipeType } from "../models/RecipeModel";

export const getReciepById = async (id: string): Promise<RecipeType | undefined> => {
  try {
    const recipe = await RecipeModel.findById(id);
    return recipe;
  } catch (error) {
    return;
  }
};
