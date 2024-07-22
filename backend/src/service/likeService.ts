import LikesModel from "../models/LikesModel";

export default class LikeService {
  static getLikeCount = async (id: string): Promise<number> => {
    try {
      const likesCount = await LikesModel.getLikeCountByRecipeId(id);
      return likesCount ?? 0;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  static like = async (data: { userId: string; recipeId: string }) => {
    return await LikesModel.create(data);
  };

  static async unkile(data: { userId: string; recipeId: string }){
    return await LikesModel.findOneAndDelete(data);
  }

  static async toggleLike(data: { userId: string; recipeId: string }){
    const savedLike = await LikesModel.find(data);
    if(savedLike && savedLike?.length >0){
    return await LikesModel.findOneAndDelete(data);
    }else{
    return await LikesModel.create(data);
    }
  }
}
