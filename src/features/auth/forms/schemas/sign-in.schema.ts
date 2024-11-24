import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({
    message: "неверный формат электронной почты",
  }),
  password: z
    .string()
    .min(5, { message: "минимальная длина пароля 5 символов" }),
});

signInFormSchema.required();
