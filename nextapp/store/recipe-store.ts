import {getAllRecipeService , IRecipeRes ,getRecipeById, IReciepById} from "@/services/recipeService";
import { ApiRes } from "@/types/ApiRes";
import { IRecipe } from "@/types/IRecipe";
import { create } from "zustand";

interface recipeStoreProps {
  recipes: IRecipe[];
  recipe:IRecipe | undefined;
  getRecipes: (
    page: string | string[] | 0,
    search: string | string[] | undefined
  ) => Promise<ApiRes<IRecipeRes> | undefined>;
  getRecipeById : (id:string)=>Promise<ApiRes<IReciepById> | undefined>
}

export const useRecipeStore = create<recipeStoreProps>()((set) => ({
  recipes: [],
  recipe:undefined,
  getRecipes: async (page, search) => {
    try {
      const res = getAllRecipeService(page, search);
      return await res;
    } catch (error) {
      console.log(error);
    }
  },
  getRecipeById:async (id)=>{
    try {
      const data = await getRecipeById(id);
      if(data?.isSuccess){
        set((s)=>({recipe:data.data.recipes}))
        return data
      }
      return undefined
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
}));
