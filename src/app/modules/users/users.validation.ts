import { z } from "zod";
const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),

    password: z.string({ required_error: "Password is required" }),
  }),
});

export const UserValidation = { createUserZodSchema };
