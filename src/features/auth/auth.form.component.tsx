"use client";

import React, { useEffect, useState } from "react";
import { signIn, signUp } from "./auth.actions";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "./forms/schemas/sign-up.schema";
import { AppDispatch, RootState } from "@/app/store";
import { setVerifyedCaptcha } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptchaComponent from "@/components/captcha.component";
import SignInFormComponent from "./forms/sign-in.form.component";

import { components } from "@/api/schema/schema";

interface AuthFormProps {
  visible: boolean;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const authState = useSelector((state: RootState) => state.auth);

  const [showCaptcha, setShowCaptcha] = useState<boolean>(false);

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const hundleSuccessCaptcha = () => {
    console.log("success captcha");
    dispatch(setVerifyedCaptcha(true));
    setShowCaptcha(false);
  };

  const hundleErrorCaptcha = (error: any) => {
    console.log(error);
  };

  async function onSubmitSignUp(values: z.infer<typeof signUpFormSchema>) {
    console.log(values);
    dispatch(signUp(values));
    signUpForm.reset();
  }

  async function onSubmitSignIn(
    values: components["schemas"]["SignInRequestDto"]
  ) {
    console.log(values);
    setShowCaptcha(true);
    dispatch(signIn(values));
  }

  const resetForms = async () => {
    signUpForm.reset();
  };

  return (
    <Dialog
      open={visible}
      onOpenChange={(open: boolean) => {
        if (!open) {
          onClose();
          resetForms();
        }
      }}
    >
      <DialogContent className="max-w-fit p-9">
        <Tabs defaultValue="sign-in" className="">
          <DialogTitle>
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="sign-in">Вход</TabsTrigger>
              <TabsTrigger value="sign-up">Регистрация</TabsTrigger>
            </TabsList>
          </DialogTitle>
          <DialogDescription className="flex justify-center">
            {authState.error?.message || authState.error?.validationErrors
              ? "todo show errors"
              : ""}
          </DialogDescription>
          <TabsContent value="sign-in" className="">
            <SignInFormComponent
              state={authState}
              onSubmit={async (values) => {
                onSubmitSignIn(values);
              }}
            />
          </TabsContent>
          <TabsContent value="sign-up">
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSubmitSignUp)}
                className="space-y-8"
              >
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
                      <FormLabel>пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={authState.loading}
                  className="w-full"
                  type="submit"
                >
                  {authState.loading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    ""
                  )}
                  зарегистрироваться
                </Button>
              </form>
            </Form>
          </TabsContent>
          <div className="pt-4">
            <CaptchaComponent
              onSuccessVerify={hundleSuccessCaptcha}
              onErrorVerify={hundleErrorCaptcha}
            />
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
