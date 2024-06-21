import mongoose from "mongoose";

export const likesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User id is a required field"],
    },
    recipeId: {
      type: mongoose.Types.ObjectId,
      required: [true, "RecipeId is a required field"],
    },
  },
  {
    timestamps: true,
    statics: {
      getLikeCountByRecipeId(recipeId) {
        return this.countDocuments({ recipeId });
      },
    },
  }
);


likesSchema.index({userId:1,recipeId:1},{unique:true})

export default mongoose.model("Like",likesSchema)
