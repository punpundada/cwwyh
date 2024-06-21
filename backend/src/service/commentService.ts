import CommentsModel from "../models/CommentsModel"

export const getCommentsByRecipeId = async (id:string) => {
    try {
        const comments = await CommentsModel.find({recipeId:id})
        return comments ?? undefined
    } catch (error) {
        console.log(error)
        return
    }
}


export const getCommentByCommentId = async (id:string) => {
    try {
        const comment = CommentsModel.findById(id);
        console.log(comment)
        return await comment ?? undefined
    } catch (error) {
        console.error(error)
        return
    }
}