"use client";

import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email({
      message: "неверный формат электронной почты",
    }),
    password: z.string().min(5, {
      message: "длина пароля должна быть больше или равна 5 символам",
    }),
    firstName: z
      .string()
      .min(1, { message: 'поле "имя"  не может быть пустым' }),
    lastName: z
      .string()
      .min(1, { message: 'поле "фамилия"  не может быть пустым' }),
  })
  .required();
