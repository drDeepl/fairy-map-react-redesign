import React, { useState } from "react";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import ErrorsAlertComponent from "@/components/errors-alert.component";
import { Components } from "@/api/schemas/client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AddBookFormProps {
  open: boolean;
  errors: Record<string, string> | null;
  loading: boolean;
  ethnicGroups: Components.Schemas.EthnicGroupLanguageDto[];
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

  const [ethnicGroupsOpen, setEthnicGroupsOpen] = useState<boolean>(false);

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
                  <Popover open={ethnicGroupsOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          onClick={() => setEthnicGroupsOpen(true)}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? ethnicGroups.find(
                                (ethnicGroup) => ethnicGroup.id === field.value
                              )?.name
                            : "Выберите этническую группу"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandInput
                          placeholder="начните поиск..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            Этнические группы не найдены
                          </CommandEmpty>
                          <CommandGroup>
                            {ethnicGroups.map((ethnicGroup) => (
                              <CommandItem
                                value={ethnicGroup.name}
                                key={ethnicGroup.id}
                                onSelect={() => {
                                  setEthnicGroupsOpen(false);
                                  addBookForm.setValue(
                                    "ethnicGroupId",
                                    ethnicGroup.id
                                  );
                                }}
                              >
                                {ethnicGroup.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    ethnicGroup.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
