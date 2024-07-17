import z from "zod";

export const zodRecipeSchema = z.object({
  recipeName: z.string({ required_error: "Recipe name is a required field" }),
  userId: z.string({ required_error: "User id is a required field" }),
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
  prepTime: z
    .number({ required_error: "Prep time in minutes is required" })
    .positive("Prep time must be positive")
    .min(1, "Prep time must me more than 1 minutes"),
  cookingTime: z
    .number({ required_error: "Cooking time in minutes is required" })
    .positive("Cooking time must be positive")
    .min(1, "Cooking time must me more than 1 minutes"),
  servings: z
    .number({ required_error: "Servings is a required filed" })
    .min(1, "Servings is a required field"),
  difficultyLevel: z.enum(["EASY", "MEDIUM", "ADVANCE"], {
    errorMap: () => ({ message: "Please select difficulty" }),
  }),
  calories: z.number({ required_error: "Calories in Kcal is required" }).min(1),
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
  notes: z.string().min(1).optional(),
});


export type RecipeZodType = z.infer<typeof zodRecipeSchema>;