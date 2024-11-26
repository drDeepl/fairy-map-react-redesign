import React, { useEffect } from "react";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { RootState } from "@/app/store";
import { EthnicGroupListState } from "@/features/ethnic-group/ethnic-group-list.slice";
import { useSelector } from "react-redux";
import { dispatch } from "d3";
import { fetchEthnicGroups } from "@/features/ethnic-group/ethnic-group-list.actions";
import { Skeleton } from "@/components/ui/skeleton";

interface AddBookFormProps {
  loading: boolean;
  onSubmit: (values: Components.Schemas.AddStoryDto) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ loading, onSubmit }) => {
  const ethnicGrooupListState: EthnicGroupListState = useSelector(
    (state: RootState) => state.ethnicGroupList
  );

  const addBookForm = useForm<z.infer<typeof addBookFormSchema>>({
    resolver: zodResolver(addBookFormSchema),
    defaultValues: {
      name: "",
      text: "",
      ethnicGroupId: undefined,
    },
  });

  return (
    <Form {...addBookForm}>
      <form onSubmit={addBookForm.handleSubmit(onSubmit)} className="space-y-8">
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
        {/* <FormField
          control={addBookForm.control}
          name="ethnicGroupId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Этническая группа</FormLabel>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="выберите этническую группу..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ethnicGrooupListState.loading ? (
                  <Skeleton className="w-56 h-8" />
                ) : (
                  ethnicGrooupListState.ethnicGroups.map(
                    (ethnicGroup: Components.Schemas.EthnicGroupDto) => {
                      return (
                        <SelectItem
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
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button disabled={loading} className="w-full" type="submit">
          {loading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          добавить
        </Button>
      </form>
    </Form>
  );
};

export default AddBookForm;
