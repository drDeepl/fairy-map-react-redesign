import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthFormProps } from "@/types/forms/auth.form.interface";

import { Button } from "@/components/ui/button";
import { Components } from "@/api/schemas/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signInFormSchema } from "./schemas/sign-in.schema";

interface SignInFormProps extends AuthFormProps {
  onSubmit: (values: Components.Schemas.SignInRequestDto) => Promise<void>;
}

const SignInForm: React.FC<SignInFormProps> = ({ loading, onSubmit }) => {
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {loading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          войти
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
