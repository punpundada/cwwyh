import z from "zod";

export const commentInsertZodSchema = z.object({
  body: z.string({ required_error: "Comment body is a required field" }),
  authorId: z.string({ required_error: "Author id is a required field" }),
  createdAt: z
    .date()
    .refine((val) => z.date().parse(new Date(val)), {
      message: "Invalid createdAt date",
    }),
});

export const commentSelectSchema = z.object({
  _id:z.string(),
  body: z.string({ required_error: "Comment body is a required field" }),
  authorId: z.string({ required_error: "Author id is a required field" }),
  createdAt: z
    .date()
    .refine((val) => z.date().parse(new Date(val)), {
      message: "Invalid createdAt date",
    }),
})

export type CommentInsert = z.infer<typeof commentInsertZodSchema>;
export type CommentSelect = z.infer<typeof commentSelectSchema>;