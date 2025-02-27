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

import { signUpFormSchema } from "../forms/schemas/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthFormProps } from "@/types/forms/auth.form.interface";

import { Components } from "@/api/schemas/client";

interface SignUpFormProps extends AuthFormProps {
  onSubmit: (values: Components.Schemas.SignUpRequestDto) => Promise<void>;
  children?: React.ReactNode;
}

const SignUpFormComponent: React.FC<SignUpFormProps> = ({
  onSubmit,
  children,
}) => {
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSubmit)}
        className="gap-2 grid grid-cols-2 items-content-center justify-content-center"
      >
        <FormField
          control={signUpForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фамилия</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signUpForm.control}
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
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="p-0 m-0">пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center">{children}</div>
      </form>
    </Form>
  );
};

export default SignUpFormComponent;
