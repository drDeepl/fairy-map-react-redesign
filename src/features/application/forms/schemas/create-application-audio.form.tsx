import { useForm } from "react-hook-form";
import { z } from "zod";
import createApplicationFormSchema from "../../../audio-book/forms/schemas/create-application-audio.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Components } from "@/api/schemas/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import apiClient from "@/api/apiClient";
import { Block } from "notiflix/build/notiflix-block-aio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CreateApplicationAudioDto {
  audioFormData: FormData;
  languageId: number;
  storyId: number;
}

interface CreateApplicationAudioFormProps {
  storyId: number;
  languages: Components.Schemas.LanguageDto[];
  userId: number;
  onSubmit: (dto: CreateApplicationAudioDto) => Promise<void>;
  children?: React.ReactNode;
}
const CreateApplicationAudioForm: React.FC<CreateApplicationAudioFormProps> = ({
  storyId,
  languages,
  userId,
  onSubmit,
  children,
}) => {
  const form = useForm<z.infer<typeof createApplicationFormSchema>>({
    resolver: zodResolver(createApplicationFormSchema),
    defaultValues: {
      audioFile: undefined,
      useTerms: undefined,
      storyId: storyId,
      languageId: undefined,
    },
  });

  const [openLanguages, setOpenLanguages] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    form.reset();
  }, []);

  const handleSumbitForm = async (
    data: z.infer<typeof createApplicationFormSchema>
  ) => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const formData = new FormData();
      formData.append("audio", fileInputRef.current.files[0]);

      try {
        const dto: CreateApplicationAudioDto = {
          audioFormData: formData,
          languageId: data.languageId,
          storyId: data.storyId,
        };
        await onSubmit(dto);
        fileInputRef.current.value = "";
        form.reset();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Card className="add-audio-form__container border-none shadow-none">
      <CardHeader className="mt-0">
        <CardTitle className="flex justify-between items-center space-x-2">
          <span>Создание заявки на добавление озвучки</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSumbitForm)}
            className="w-full space-y-6 flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="audioFile"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Файл с озвучкой</FormLabel>
                  <Input
                    {...fieldProps}
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="languageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Язык озвучки</FormLabel>
                  <Popover open={openLanguages}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={() => setOpenLanguages(!openLanguages)}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.id === field.value
                              )?.name
                            : "Выберите язык для озвучки"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="">
                      <Command>
                        <CommandInput
                          placeholder="начните поиск..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            языки для озвучки не найдены
                          </CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.name}
                                key={language.id}
                                onSelect={() => {
                                  form.setValue("languageId", language.id);
                                  setOpenLanguages(false);
                                }}
                              >
                                {language.name}
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
            <FormField
              control={form.control}
              name="useTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>
                      даю согласие на обработку персональных данных
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">{children}</div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateApplicationAudioForm;
