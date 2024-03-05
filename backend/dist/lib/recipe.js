function getModifiedRecipe(recipe) {
    const newIngredientList = recipe?.ingredientsList?.map((ingredient) => {
        return {
            _id: ingredient._id,
            quantity: ingredient.quantity,
            ingredientName: ingredient?.ingredientId?.ingredientName,
        };
    });
    const { userId, ...rest } = recipe;
    return {
        ...rest,
        ingredientsList: newIngredientList,
        user: {
            userId: recipe.userId._id,
            userName: recipe.userId.firstName + " " + recipe.userId.lastName,
            profilePictue: recipe.userId.imgUrl,
        },
    };
}
export { getModifiedRecipe };
//# sourceMappingURL=recipe.js.map