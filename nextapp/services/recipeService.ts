import axiosInstance from "@/constants/axiosInstance";
import { newAbortSignal } from "@/lib/utils";
import { ApiRes, GenericResponse } from "@/types/ApiRes";
import { IRecipe, RecipeCardType } from "@/types/IRecipe";
import { cache } from "react";
const controller = new AbortController();
export interface IRecipeRes {
  recipes: IRecipe[];
  message: string;
}

export const getAllRecipeService = cache(
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
      const res = await axiosInstance.get<ApiRes<IRecipeRes> | undefined>(restUrl);
      if (res?.data?.isSuccess) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export interface IReciepById {
  recipes: IRecipe;
}

export const getRecipeById = cache(async (id: string) => {
  try {
    const data = await axiosInstance.get<ApiRes<IReciepById>>(`recipe/get/${id}`, {
      signal: newAbortSignal(5000),
    });
    if (data.data.isSuccess) {
      return data.data;
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
});

export const getIngredientList = cache(async () => {
  try {
    const list = await axiosInstance.get("", {
      signal: newAbortSignal(5000),
    });
  } catch (error) {}
});

export default class RecipeService {
  static getAllRecipeService = cache(
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
        const res = await axiosInstance.get<ApiRes<IRecipeRes> | undefined>(restUrl);
        if (res?.data?.isSuccess) {
          return res.data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  static getRecipeCardList = cache(
    async (page: string | string[] | 0, search: string | string[] | undefined) => {
      let restUrl = "/recipe/get-card-list";

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
        const res = await axiosInstance.get<GenericResponse<RecipeCardType[]>>(restUrl);
        if (res.data?.isSuccess) {
          return res.data;
        } else {
          return { isSuccess: false, issues: [], message: "Someting went wrong" };
        }
      } catch (error: any) {
        return {
          isSuccess: false,
          issues: error.issues ?? [],
          message: error.message,
        };
      }
    }
  );
}
