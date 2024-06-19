import z from "zod";
import dotenv from 'dotenv';

dotenv.config()

const numberStringSchema = z.string().refine(val => /^\d+$/.test(val), {
  message: "String must contain only numbers",
});

const envarSchem = z.object({
  PORT: numberStringSchema,
  MONGODB_CONNECTION_STRING: z.string({required_error:""}),
  ACCESS_TOKEN_SECRET: z.string(),
});

export type env = z.infer<typeof envarSchem>;

try {
  envarSchem.parse(process.env);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

export default envarSchem.parse(process.env)
