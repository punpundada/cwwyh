import z, { ZodError } from "zod";
import dotenv from 'dotenv';

dotenv.config()

const numberStringSchema = z.string({required_error:"PORT is a required envar"}).refine(val => /^\d+$/.test(val), {
  message: "String must contain only numbers",
});

const envarSchem = z.object({
  PORT: numberStringSchema,
  MONGODB_CONNECTION_STRING: z.string({required_error:"MONGODB_CONNECTION_STRING is a required envar"}),
  ACCESS_TOKEN_SECRET: z.string({required_error:"ACCESS_TOKEN_SECRET is a required envar"}),
});

export type env = z.infer<typeof envarSchem>;

try {
  envarSchem.parse(process.env);
} catch (error) {
  if(error instanceof ZodError){
    const message = error.issues.map(x=>`${x.message}, `)
    console.error(message);
    process.exit(1);
  }
  console.error(error.message);
}

export default envarSchem.parse(process.env)
