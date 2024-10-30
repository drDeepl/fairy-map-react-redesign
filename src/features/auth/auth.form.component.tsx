"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInFormSchema } from "./schemas/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "./schemas/sign-up.schema";
import { RootState } from "@/app/store";
import { setVerifyedCaptcha, signIn, signUp } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptchaComponent from "@/components/captcha.component";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";

interface AuthFormProps {
  visible: boolean;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const authState = useSelector((state: RootState) => state.auth);

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
  };

  const hundleErrorCaptcha = (error: any) => {
    console.log(error);
  };

  async function onSubmitSignIn(values: z.infer<typeof signInFormSchema>) {
    console.log(values);
    dispatch(signIn(values));
    signInForm.reset();
  }

  async function onSubmitSignUp(values: z.infer<typeof signInFormSchema>) {
    console.log(values);
    dispatch(signUp(values));
    signUpForm.reset();
  }

  const resetForms = async () => {
    signUpForm.reset();
    signInForm.reset();
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
          <TabsContent value="sign-in" className="">
            <Form {...signInForm}>
              <form
                onSubmit={signInForm.handleSubmit(onSubmitSignIn)}
                className="space-y-8"
              >
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
                <Button
                  disabled={authState.loading || !authState.verifyedCaptcha}
                  className="w-full"
                  type="submit"
                >
                  {authState.loading ? (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    ""
                  )}
                  войти
                </Button>
              </form>
            </Form>
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
                  disabled={authState.loading || !authState.verifyedCaptcha}
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
          <CaptchaComponent
            onSuccessVerify={hundleSuccessCaptcha}
            onErrorVerify={hundleErrorCaptcha}
          />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
