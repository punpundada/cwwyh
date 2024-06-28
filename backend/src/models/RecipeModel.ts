import mongoose, { Types, InferSchemaType } from "mongoose";
const { Schema } = mongoose;
import { z } from "zod";

const RecipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: [true, "Recipe name is a Required Field"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is a Required Field"],
    },
    userName: {
      type: String,
      required: false,
    },
    ingredientsList: [
      {
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: [true, "Ingredients List is a Required Field"],
        },
        quantity: String,
      },
    ],
    description: {
      type: String,
      required: [true, "Recipe Description is a Required Field"],
      minlength: [150, "Description should be at least 10 characters long."],
    },
    prepTime: {
      type: Date,
      required: [true, "Prepration Time is a Required Field"],
    },
    difficultyLevel: {
      type: Schema.Types.ObjectId,
      ref: "DifficultyLevel",
      required: [true, "Difficulty Level is a Required Field"],
    },
    imgUrls: [
      {
        imgUrl: {
          type: String,
        },
      },
    ],
    steps: [
      {
        step: {
          type: String,
          required: [true, "Steps is a required field"],
        },
      },
    ],
    cuisine: {
      type: Schema.Types.ObjectId,
      ref: "Cuisine",
      require: [true, "Cuisine is a required field"],
    },
    course: {
      type: String,
      enum: ["DINNER", "LUNCH", "BREAKFAST"],
      require: [true, "Course is a required field"],
    },
    servings:{
      type:Schema.Types.Number,
      required:[true,"Number of serving is a required field"]
    },
    cookingTime:{
      type: Date,
      required: [true, "Cooking Time is a Required Field"],
    },
    calories:{
      type:String,
      required:[true,"calories is a required field"]
    }

  },
  {
    timestamps: true,
    query:{
      byName(recipeName:string){
        return this.where({recipeName: new RegExp(recipeName,'i')})
      }
    }
  },
);

export type RecipeType = InferSchemaType<typeof RecipeSchema>;

const RecipeModel = mongoose.model("Recipes", RecipeSchema);
export default RecipeModel;


