import axiosInstance from "@/constants/axiosInstance";
import { GenericResponse } from "@/types/ApiRes";

export default class LikesService {
  static async like(recipeId: string) {
    try {
      const data = await axiosInstance.post<GenericResponse<boolean>>("likes/add", {
        recipeId,
      });
      return data.data;
    } catch (error: any) {
      console.error(error);
      return {
        isSuccess: false,
        issues: error.issues,
        message: error.message,
      };
    }
  }
  static async unlike(recipeId: string) {
    try {
      const data = await axiosInstance.get<GenericResponse<boolean>>("likes/remove/"+recipeId);
      return data.data;
    } catch (error: any) {
      console.error(error);
      return {
        isSuccess: false,
        issues: error.issues,
        message: error.message,
      };
    }
  }
}
