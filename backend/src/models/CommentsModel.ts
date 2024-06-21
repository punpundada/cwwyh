import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, "Comment body is a required field"],
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Author is a required field"],
    },
    recipeId:{
      type:mongoose.Types.ObjectId,
      required:[true,"Recipe id is a required filed"]
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({authorId:1,recipeId:1},{unique:true})

export type Comment = mongoose.InferSchemaType<typeof commentSchema>
export default mongoose.model("Comment", commentSchema);