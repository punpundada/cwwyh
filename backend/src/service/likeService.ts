import LikesModel from "../models/LikesModel"

export const getLikeCount = async (id:string):Promise<number> => {
    try {
        const likesCount = await LikesModel.getLikeCountByRecipeId(id)
        return likesCount ?? 0
    } catch (error) {
        console.error(error)
        return 0
    }
}