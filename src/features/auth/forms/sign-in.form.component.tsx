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

import { Components } from "@/api/schemas/client";

import { signInFormSchema } from "./schemas/sign-in.schema";

interface SignInFormProps extends AuthFormProps {
  onSubmit: (values: Components.Schemas.SignInRequestDto) => Promise<void>;
  children?: React.ReactNode;
}

const SignInForm: React.FC<SignInFormProps> = ({
  loading,
  onSubmit,
  children,
}) => {
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(onSubmit)}
        className="space-y-8 w-full"
      >
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="" {...field} />
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
                <Input
                  disabled={loading}
                  type="password"
                  placeholder=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
