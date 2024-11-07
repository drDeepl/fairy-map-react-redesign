import React, { useCallback, useEffect } from "react";
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

import { signInFormSchema } from "../forms/schemas/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthFormProps } from "@/types/forms/auth.form.interface";
import { components } from "@/api/schema/schema";
import { Button } from "@/components/ui/button";

import { ReloadIcon } from "@radix-ui/react-icons";

interface SignIngFormProps extends AuthFormProps {
  onSubmit: (
    values: components["schemas"]["SignInRequestDto"]
  ) => Promise<void>;
}

const SignInFormComponent: React.FC<SignIngFormProps> = ({
  loading,
  verifyedCaptcha,
  onSubmit,
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
              <FormLabel>пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={!verifyedCaptcha} className="w-full" type="submit">
          {loading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          войти
        </Button>
      </form>
    </Form>
  );
};

export default SignInFormComponent;
