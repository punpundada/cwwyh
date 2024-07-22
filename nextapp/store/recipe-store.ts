import RecipeService, {
  getAllRecipeService,
  IRecipeRes,
  getRecipeById,
  IReciepById,
} from "@/services/recipeService";
import { ApiRes } from "@/types/ApiRes";
import { IRecipe, RecipeCardType } from "@/types/IRecipe";
import { create } from "zustand";

interface recipeStoreProps {
  recipes: IRecipe[];
  recipe: IRecipe | undefined;
  getRecipeCardList: (
    page: string | string[] | 0,
    search: string | string[] | undefined
  ) => Promise<RecipeCardType[]>;
  recipeCardList: RecipeCardType[];
  getRecipes: (
    page: string | string[] | 0,
    search: string | string[] | undefined
  ) => Promise<ApiRes<IRecipeRes> | undefined>;
  getRecipeById: (id: string) => Promise<ApiRes<IReciepById> | undefined>;
  toggleLike: (recipeId: string) => Promise<void>;
}

export const useRecipeStore = create<recipeStoreProps>()((set, get) => ({
  recipes: [],
  recipe: undefined,
  recipeCardList: [],
  getRecipes: async (page, search) => {
    try {
      const res = getAllRecipeService(page, search);
      return await res;
    } catch (error) {
      console.log(error);
    }
  },
  getRecipeById: async (id) => {
    try {
      const data = await getRecipeById(id);
      if (data?.isSuccess) {
        set((s) => ({ recipe: data.data.recipes }));
        return data;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  getRecipeCardList: async (page, search) => {
    const data: any = await RecipeService.getRecipeCardList(page, search);
    if (data.isSuccess) {
      set({ recipeCardList: data.result });
      return data.result;
    }
    return [];
  },
  toggleLike: async (recipeId) => {
    const recipe = get().recipeCardList.find((x) => x._id === recipeId);
    if (!recipe) return;
    const res = await RecipeService.toggleLike(recipeId);
    if (!res) return;
    if (res.isSuccess) {
      const newList = get().recipeCardList.map((x) => {
        if (x._id === recipe._id) {
          recipe.isLiked = !recipe.isLiked;
          recipe.likesCount = recipe.isLiked
            ? recipe.likesCount + 1
            : recipe.likesCount - 1;
          return recipe;
        }
        return x;
      });
      set({ recipeCardList: newList });
    }
  },
}));
