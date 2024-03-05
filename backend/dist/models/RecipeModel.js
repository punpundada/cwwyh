import mongoose from "mongoose";
const { Schema } = mongoose;
// import { IngredientSchema } from "./IngredientModel.js";
const RecipeSchema = new mongoose.Schema({
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
        required: false
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
        required: [true, 'Recipe Description is a Required Field'],
        minlength: [150, 'Description should be at least 10 characters long.'],
    },
    prepTime: {
        type: String,
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
                required: [true, 'Steps is a required field']
            }
        }
    ]
}, {
    timestamps: true,
});
const RecipeModel = mongoose.model("Recipes", RecipeSchema);
export default RecipeModel;
//# sourceMappingURL=RecipeModel.js.map