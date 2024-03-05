import mongoose from "mongoose";
const IngredientSchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: [true, 'Ingredient Name is a Required Field']
    }
}, {
    timestamps: true,
});
const IngredientModel = mongoose.model('Ingredient', IngredientSchema);
export { IngredientModel, IngredientSchema };
//# sourceMappingURL=IngredientModel.js.map