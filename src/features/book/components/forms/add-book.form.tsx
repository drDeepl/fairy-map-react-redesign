import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { Components } from "@/api/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addBookFormSchema } from "./schemas/add-book.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EthnicGroupListState } from "@/features/ethnic-group/ethnic-group-list.slice";
import { fetchEthnicGroups } from "@/features/ethnic-group/ethnic-group-list.actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import ErrorsAlertComponent from "@/components/errors-alert.component";

interface AddBookFormProps {
  open: boolean;
  errorrs: Record<string, string> | null;
  loading: boolean;
  ethnicGroups: Components.Schemas.EthnicGroupDto[];
  onSubmit: (values: Components.Schemas.AddStoryDto) => void;
  onCancel: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({
  open,
  errors,
  loading,
  ethnicGroups,
  onSubmit,
  onCancel,
}) => {
  const addBookForm = useForm<z.infer<typeof addBookFormSchema>>({
    resolver: zodResolver(addBookFormSchema),
    defaultValues: {
      name: "",
      text: "",
      ethnicGroupId: undefined,
    },
  });

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      addBookForm.reset();
      onCancel();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => handleOnOpenChange(open)}
    >
      <DialogTitle>добавить сказку</DialogTitle>
      <DialogDescription>
        {errors ? <ErrorsAlertComponent title="что-то пошло не так" /> : null}
      </DialogDescription>
      <DialogClose
        onClick={() => {
          console.log("click clise");
        }}
      ></DialogClose>
      <DialogContent>
        <Form {...addBookForm}>
          <form onSubmit={addBookForm.handleSubmit(onSubmit)}>
            <FormField
              control={addBookForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название сказки</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addBookForm.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Текст сказки</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addBookForm.control}
              name="ethnicGroupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Этническая группа</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="выберите этническую группу..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loading ? (
                        <Skeleton className="w-56 h-8" />
                      ) : (
                        ethnicGroups.map(
                          (ethnicGroup: Components.Schemas.EthnicGroupDto) => {
                            return (
                              <SelectItem
                                className="cursor-pointer"
                                key={`ethnic_group_${ethnicGroup.id}`}
                                value={`${ethnicGroup.id}`}
                              >
                                {ethnicGroup.name}
                              </SelectItem>
                            );
                          }
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="w-full mt-8" type="submit">
              {loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              добавить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookForm;
