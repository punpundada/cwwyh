import z from "zod";
export interface IRecipe {
  _id: string
  recipeName: string
  ingredientsList: IngredientsList[]
  description: string
  prepTime: number
  cookingTime: number
  difficultyLevel: string
  imgUrls: ImgUrl[]
  steps: Step[]
  cuisine: string
  course: string
  servings: number
  calories: number
  notes: string
  createdAt: string
  updatedAt: string
  __v: number
  user: User
  likesCount: number
  isLiked: boolean
}

export interface IngredientsList {
  _id: string
  quantity: string
  measurement: Measurement
}

export interface Measurement {
  _id: string
  name: string
  type: string
}

export interface ImgUrl {
  imgUrl: string
  _id: string
}

export interface Step {
  step: string
  _id: string
}

export interface User {
  userId: string
  userName: string
}


const IngredientSchema = z.object({
  ingredientId: z
    .string({ required_error: "Ingredient is required" })
    .min(1, { message: "Ingredient is required" }),
  quantity: z
    .string({ required_error: "Quantity is required" })
    .min(1, "Quantity is required"),
});

const ImgUrlSchema = z.object({
  imgUrl: z
    .string({ required_error: "Image is required" })
    .url({ message: "Must be a URL" }),
});

const StepSchema = z.object({
  step: z
    .string({ required_error: "Direction is required" })
    .min(1, "Direction is required"),
});

export const RecipeSchema = z.object({
  recipeName: z
    .string({ required_error: "Please enter recipe name" })
    .min(1, "Please enter recipe name"),
  ingredientsList: z
    .array(IngredientSchema)
    .min(1, { message: "Please add atleast one ingredient" }),
  description: z
    .string({ required_error: "Please enter description" })
    .min(1, "Please enter description"),
  prepTime: z.coerce
    .number({
      required_error: "Please enter prep time",
      invalid_type_error: "Prep time must be number",
    })
    .min(1, "Please enter prep time"),
  difficultyLevel: z.enum(["EASY", "MEDIUM", "ADVANCE"], {
    errorMap: () => ({ message: "Please select difficulty" }),
  }),
  imgUrls: z.array(ImgUrlSchema).min(1, { message: "Please add at least one image" }),
  steps: z.array(StepSchema).min(1, { message: "Please add atleast one  step" }),
  cuisine: z
    .string({ required_error: "Please select cuisine" })
    .min(1, "Please select cuisine"),
  course: z.enum(["BREAKFAST", "LUNCH", "DINNER"], {
    errorMap: () => ({ message: "Please select course" }),
  }),
  servings: z.coerce
    .number({ invalid_type_error: "Servings must be a number" })
    .int()
    .positive(),
  cookingTime: z.coerce
    .number({
      required_error: "Please enter cooking time",
      invalid_type_error: "Cooking time must be number",
    })
    .min(1, "Cooking time cannot be less than 1"),
  calories: z
    .string({ required_error: "Please enter calories in Kcal" })
    .min(1, "Please enter calories in Kcal"),
  filterIngredient: z.string().optional().nullable(),
});

export type RecipeInsert = z.infer<typeof RecipeSchema>;


export const RecipeCardSchema = z.object({
  _id: z.string(),
  recipeName: z.string(),
  userId: z.object({
    _id: z.string(),
    firstName: z.string(),
    lastName: z.string()
  }),
  description: z.string(),
  imgUrls: z.array(z.object({ imgUrl: z.string() })),
  likesCount: z.number(),
  isLiked:z.boolean(),
})

export type RecipeCardType = z.infer<typeof RecipeCardSchema>;

