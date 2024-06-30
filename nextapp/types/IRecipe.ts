import z from "zod";
export type User = {
  userId: string;
  userName: string;
};
export interface IRecipe {
  _id: string;
  recipeName: string;
  user: User;
  ingredientsList: IngredientsList[];
  prepTime: string;
  description: string;
  difficultyLevel: string;
  imgUrls: ImgUrl[];
  steps: IStep[];
}
interface IStep {
  step: string;
}

interface IngredientsList {
  ingredientId: string;
  quantity: string;
  _id: string;
}

interface ImgUrl {
  imgUrl: string;
  _id: string;
}

const IngredientSchema = z.object({
  ingredientId: z.string(),
  quantity: z.string(),
});

const ImgUrlSchema = z.object({
  imgUrl: z.string().url(),
});

const StepSchema = z.object({
  step: z.string(),
});

export const RecipeSchema = z.object({
  recipeName: z.string(),
  ingredientsList: z.array(IngredientSchema),
  description: z.string(),
  prepTime: z.string().datetime(),
  difficultyLevel: z.enum(["EASY", "MEDIUM", "HARD"]),
  imgUrls: z.array(ImgUrlSchema),
  steps: z.array(StepSchema),
  cuisine: z.string(),
  course: z.enum(["BREAKFAST", "LUNCH", "DINNER"]),
  servings: z.coerce.number({invalid_type_error:"Servings must be a number"}).int().positive(),
  cookingTime: z.string().datetime(),
  calories: z.string(),
});

export type RecipeInsert = z.infer<typeof RecipeSchema>;