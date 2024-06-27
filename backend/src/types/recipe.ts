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
    .string({ required_error: "Prep time is a required field" })
    .refine((val) => z.date().parse(new Date(val)), {
      message: "Invalid date format",
    }),
  difficultyLevel: z.enum(["EASY","INTERMEDIATE","ADVANCE","EXPERT"],{required_error:"difficultyLevel is a required field"}),
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
  cuisine: z.string({ required_error: "CuisineId is a required field" }),
  course: z.enum(["DINNER", "LUNCH", "BREAKFAST"], {
    required_error: "Course is a required field",
  }),
});
