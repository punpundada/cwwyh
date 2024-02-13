import getAllRecipeService, { IRecipeRes } from "@/services/recipeService";
import { ApiRes } from "@/types/ApiRes";
import { IRecipe } from "@/types/IRecipe";
import { create } from "zustand";

interface recipeStoreProps {
  recipes: IRecipe[];
  getRecipes: (
    page: string | string[] | 0,
    search: string | string[] | undefined
  ) => Promise<ApiRes<IRecipeRes> | undefined>;
}

export const useRecipeStore = create<recipeStoreProps>()((set) => ({
  recipes: [],
  getRecipes: async (page, search) => {
    try {
      const res = getAllRecipeService(page, search);
      return await res;
    } catch (error) {
      console.log(error);
    }
  },
}));
