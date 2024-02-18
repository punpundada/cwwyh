import axiosInstance from "@/constants/axiosInstance";
import { ApiRes } from "@/types/ApiRes";
import { IRecipe } from "@/types/IRecipe";
import { cache } from "react";

export interface IRecipeRes {
  recipes: IRecipe[];
  message: string;
}

const getAllRecipeService = cache(
  async (
    page: string | string[] | 0,
    search: string | string[] | undefined
  ): Promise<ApiRes<IRecipeRes> | undefined> => {
    let restUrl = "/recipe/get";

    if (page && search !== undefined && search !== "") {
      restUrl = `${restUrl}?search=${search}&page=${page}`;
    }
    if (page && +page > 0) {
      restUrl = `${restUrl}?page=${page}`;
    }
    if (search !== undefined && search !== "") {
      restUrl = `${restUrl}?search=${search}`;
    }
    try {
      const res = await axiosInstance.get<ApiRes<IRecipeRes> | undefined>(
        restUrl
      );
      if (res?.data?.isSuccess) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export default getAllRecipeService;
