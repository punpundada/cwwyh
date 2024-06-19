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
  },
  {
    timestamps: true,
  }
);

export type RecipeType = InferSchemaType<typeof RecipeSchema>;

const RecipeModel = mongoose.model("Recipes", RecipeSchema);
export default RecipeModel;

export const zodRecipeSchema = z.object({
  recipeName: z.string({ required_error: "Recipe name is a required field" }),
  userId: z.string({ required_error: "User id is a required field" }),
  userName: z.string({ required_error: "User name is a required field" }),
  ingredientsList: z
    .array(
      z.object({
        ingredientId: z.string({
          required_error: "ingredient id is a required field",
        }),
        quantity: z.string({ required_error: "quantity is a required field" }),
      })
    )
    .min(1, "Minimum ingredients length is 1"),
  description: z.string().min(150, "Description should be minimum 150 words"),
  prepTime: z.string({ required_error: "Prep time is a required field" }).refine(val=>z.date().parse(new Date(val)),{message:"Invalid date format"}),
  difficultyLevel: z.string({
    required_error: "Difficulty level is a required field",
  }),
  imgUrls: z
    .array(
      z.object({
        imgUrl: z.string({ required_error: "Image URL is a required field" }),
      })
    )
    .min(1, { message: "Min step is 1" }),
  steps: z
    .array(
      z.object({
        step: z.string({ required_error: "Step is a required field" }),
      })
    )
    .min(1, { message: "at least 1 step is required" }),
  cuisine: z.string({ required_error: "Cuisine is a required field" }),
  course: z.enum(["DINNER", "LUNCH", "BREAKFAST"], {
    required_error: "Course is a required field",
  }),
});
