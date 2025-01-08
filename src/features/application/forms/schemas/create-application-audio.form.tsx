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
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import apiClient from "@/api/apiClient";
import { Block } from "notiflix/build/notiflix-block-aio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

interface CreateApplicationAudioFormProps {
  storyId: number;
  languages: Components.Schemas.LanguageDto[];
  userId: number;
  onClose: () => void;
}
const CreateApplicationAudioForm: React.FC<CreateApplicationAudioFormProps> = ({
  storyId,
  languages,
  userId,
  onClose,
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
  const { toast } = useToast();

  const setOverlayLoad = (load: boolean) => {
    load
      ? Block.dots(".add-audio-form__container", { cssAnimationDuration: 5000 })
      : Block.remove(".add-audio-form__container");
  };
  useEffect(() => {
    form.reset();
    setOverlayLoad(false);
  }, []);

  const handleSumbitForm = async (
    data: z.infer<typeof createApplicationFormSchema>
  ) => {
    setOverlayLoad(true);
    if (fileInputRef.current && fileInputRef.current.files) {
      const formData = new FormData();
      formData.append("audio", fileInputRef.current.files[0]);

      try {
        const addedAudioResponse: any = await apiClient.paths[
          "/api/user/story/{storyId}/language/{languageId}/audio/upload"
        ].post(
          {
            storyId: data.storyId,
            languageId: data.languageId,
          },
          formData as any,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(addedAudioResponse.data);
        await apiClient.paths["/api/audio-story-request/add"].post(null, {
          userAudioId: addedAudioResponse.data.userAudioId, // 24
          userId: userId, // 1
          storyId: data.storyId,
        });
        toast({
          className: cn(
            "top-8 right-20 flex fixed w-2/3 border border-emerald-500 bg-emerald-50"
          ),
          action: (
            <div className="flex items-center space-x-2 w-full">
              <CheckCircledIcon className="size-6 text-emerald-500" />
              <span className="font-semibold text-md">
                Заявка успешно отправлена
              </span>
            </div>
          ),
        });
        fileInputRef.current.value = "";
        form.reset();
      } catch (error) {
        toast({
          className: cn(
            "top-8 right-20 flex fixed w-2/3 border border-red-500 bg-red-50"
          ),
          action: (
            <div className="flex items-center space-x-2 w-full">
              <CrossCircledIcon className="size-6 text-red-500" />
              <span className="font-semibold text-md">
                Что-то пошло не так...
              </span>
            </div>
          ),
        });
      } finally {
        setOverlayLoad(false);
      }
    }
  };

  return (
    <Card className="add-audio-form__container border-none">
      <Toaster />
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
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="secondary"
                className="border border-ghost"
                onClick={() => onClose()}
              >
                <ArrowLeftIcon />
                <span>назад</span>
              </Button>
              <Button type="submit" className="w-32">
                отправить
                <PaperPlaneIcon className="-rotate-45" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateApplicationAudioForm;
