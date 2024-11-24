import { z } from "zod";

export const addBookFormSchema = z.object({
  name: z.string().min(1, { message: "название не может быть пустым" }),
  text: z.string().min(1, { message: "текст не может быть пустым" }),
  ethnicGroupId: z.number(),
});

addBookFormSchema.required();
