import React from "react";
import { useForm } from "react-hook-form";
import { RootState } from "@/app/store";

import { ReloadIcon } from "@radix-ui/react-icons";
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

import { Button } from "@/components/ui/button";
import { AuthFormProps } from "@/types/forms/auth.form.interface";
import { components } from "@/api/schema/schema";

interface SignIngFormProps extends AuthFormProps {
  onSubmit: (
    values: components["schemas"]["SignInRequestDto"]
  ) => Promise<void>;
}

const SignInFormComponent: React.FC<SignIngFormProps> = ({
  state,
  onSubmit,
}) => {
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleOnSubmit(values: z.infer<typeof signInFormSchema>) {
    console.log("handleOnSubmit");
    onSubmit(values);
  }

  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(handleOnSubmit)}
        className="space-y-8"
      >
        <FormField
          disabled={state.loading}
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
          disabled={state.loading}
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
        {/* {state.verifyedCaptcha && signInForm.formState.isValid ? (
          <Button disabled={state.loading} className="w-full" type="submit">
            {state.loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              ""
            )}
            войти
          </Button>
        ) : (
          ""
        )} */}
      </form>
    </Form>
  );
};

export default SignInFormComponent;
