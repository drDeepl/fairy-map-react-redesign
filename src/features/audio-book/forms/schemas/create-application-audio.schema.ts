import { z } from "zod";

const MAX_FILE_SIZE = 10000000;

const createApplicationFormSchema = z.object({
  audioFile: z
    .any()
    .refine((file) => {
      return file;
    }, `обязательное поле`)
    .refine((file) => {
      return file?.size <= MAX_FILE_SIZE;
    }, `Максимальный размер файла 10MB.`),
  useTerms: z.literal(true, {
    errorMap: () => ({
      message:
        "для продолжение необходимо дать согласие на обработку персональных данных",
    }),
  }),
  storyId: z.number({
    coerce: true,
    message: "",
  }),
  languageId: z.number({
    coerce: true,
    message: "необходимо выбрать язык для озвучки",
  }),
});

createApplicationFormSchema.required();

export default createApplicationFormSchema;
