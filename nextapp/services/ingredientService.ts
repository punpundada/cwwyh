import axiosInstance from "@/constants/axiosInstance";
import { ApiRes } from "@/types/ApiRes";
import { Ingredient } from "@/types/ingredient";
import { cache } from "react";

export default class IngredientService {
  static getAllIngredient = cache(async () => {
    try {
      const res = await axiosInstance.get<ApiRes<{ingredients:Ingredient[],message:string}>>("ingredient/get");
      return res.data.data.ingredients;
    } catch (error) {
      console.error(error);
      return []
    }
  });
}
