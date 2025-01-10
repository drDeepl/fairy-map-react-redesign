import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeStatusFormSchema } from "./change-status.schema.form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ChangeApplicationStatusProps {
  onSubmit: (comment: string) => Promise<void>;
  onCancel: () => Promise<void>;
}

const ChangeApplicationStatusForm: React.FC<ChangeApplicationStatusProps> = ({
  onSubmit,
  onCancel,
}) => {
  const changeStatusForm = useForm<z.infer<typeof ChangeStatusFormSchema>>({
    resolver: zodResolver(ChangeStatusFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleOnSubmit = async (
    data: z.infer<typeof ChangeStatusFormSchema>
  ) => {
    onSubmit(data.comment);
  };

  return (
    <Form {...changeStatusForm}>
      <form
        onSubmit={changeStatusForm.handleSubmit(handleOnSubmit)}
        className="w-full space-y-6 "
      >
        <FormField
          control={changeStatusForm.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>комментарий</FormLabel>
              <FormControl className="mb-0">
                <Textarea
                  className="w-full resize-none border border-slate-400"
                  placeholder="комментарий"
                  {...field}
                />
              </FormControl>
              <FormDescription className="ml-2">
                *поле может быть пустым
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="text-red-500"
          >
            Отмена
          </Button>
          <Button
            className="bg-emerald-100 text-emerald-500 hover:bg-emerald-500 hover:text-emerald-50"
            type="submit"
          >
            Подтвердить
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangeApplicationStatusForm;
