import mongoose, { Types, InferSchemaType } from "mongoose";
const { Schema } = mongoose;

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
    ingredientsList: [
      {
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: [true, "Ingredients List is a Required Field"],
        },
        quantity: String,
        measurement:{
          type:Schema.Types.ObjectId,
          ref:"Measurements",
        }
      },
    ],
    description: {
      type: String,
      required: [true, "Recipe Description is a Required Field"],
      minlength: [150, "Description should be at least 10 characters long."],
    },
    prepTime: {
      type: Number,
      required: [true, "Prepration Time is a Required Field"],
    },
    cookingTime: {
      type: Number,
      required: [true, "Cooking time is required"],
    },
    difficultyLevel: {
      type: String,
      enum: ["EASY", "MEDIUM", "ADVANCE"],
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
    servings: {
      type: Number,
      required: [true, "Servings is a required field"],
    },
    calories: {
      type: Number,
      required: [true, "Calories is a required field"],
    },
    notes: {
      type: String,
    },
    mm:String
  },
  {
    timestamps: true,
    query: {
      byName(recipeName: string) {
        return this.where({ recipeName: new RegExp(recipeName, "i") });
      },
    },
  }
);

export type RecipeType = InferSchemaType<typeof RecipeSchema>;

const RecipeModel = mongoose.model("Recipes", RecipeSchema);
export default RecipeModel;
