import { z } from "zod";

export const ChangeStatusFormSchema = z.object({
  comment: z.string(),
});
