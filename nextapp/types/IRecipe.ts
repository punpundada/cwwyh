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
  ingredientId: z.string({required_error:"Ingredient is required"}),
  quantity: z.string({required_error:"Quantity is required"}),
});

const ImgUrlSchema = z.object({
  imgUrl: z.string({required_error:"Image is required"}).url({message:"Must be a URL"}),
});

const StepSchema = z.object({
  step: z.string({required_error:"Direction is required"}),
});

export const RecipeSchema = z.object({
  recipeName: z.string({required_error:"Please enter recipe name"}),
  ingredientsList: z.array(IngredientSchema).min(1,{message:"Please add atleast one ingredient"}),
  description: z.string(),
  prepTime: z.string().datetime(),
  difficultyLevel: z.enum(["EASY", "MEDIUM", "ADVANCE"],{required_error:"Difficulty is required"}),
  imgUrls: z.array(ImgUrlSchema).min(1,{message:"Please add at least one image"}),
  steps: z.array(StepSchema).min(1,{message:"Please add atleast one  step"}),
  cuisine: z.string(),
  course: z.enum(["BREAKFAST", "LUNCH", "DINNER"],{required_error:"Course is required"}),
  servings: z.coerce.number({invalid_type_error:"Servings must be a number"}).int().positive(),
  cookingTime: z.string().datetime(),
  calories: z.string(),
  filterIngredient:z.string().optional().nullable()
});

export type RecipeInsert = z.infer<typeof RecipeSchema>;