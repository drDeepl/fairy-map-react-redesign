"use client";

import React, { useCallback, useEffect, useState } from "react";
import { signIn, signUp } from "./auth.actions";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "./forms/schemas/sign-up.schema";
import { AppDispatch, RootState } from "@/app/store";
import {
  setError,
  setLoad,
  setValidDataForm,
  setVerifyedCaptcha,
} from "./authSlice";
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
import ErrorsAlertComponent from "@/components/error-alert.component";

enum Tab {
  SignIn = "signin",
  SignUp = "signup",
}

interface AuthFormProps {
  visible: boolean;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const authState = useSelector((state: RootState) => state.auth);

  const [verifyedCaptcha, setVerifyedCaptcha] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>(Tab.SignIn);

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const hundleSuccessCaptcha = () => {
    console.log("success captcha");
    setVerifyedCaptcha(true);
  };

  const hundleErrorCaptcha = (error: any) => {
    console.log(error);
  };

  async function onSubmitSignUp(values: z.infer<typeof signUpFormSchema>) {
    console.log(values);
    dispatch(signUp(values));
    signUpForm.reset();
  }

  const handleSignIn = useCallback(
    async (values: components["schemas"]["SignInRequestDto"]) => {
      dispatch(signIn(values));
    },
    []
  );

  const handleOnClose = () => {
    onClose();
    resetForms();
    dispatch(setLoad(false));
    dispatch(setError(null));
  };

  // async function onSubmitSignIn(
  //   values: components["schemas"]["SignInRequestDto"]
  // ) {
  //   console.log(values);

  //   dispatch(signIn(values));
  // }

  const resetForms = async () => {
    signUpForm.reset();
  };

  return (
    <Dialog
      open={visible}
      onOpenChange={(open: boolean) => {
        if (!open) {
          handleOnClose();
        }
      }}
    >
      <DialogContent className="max-w-fit p-9">
        <Tabs
          defaultValue={Tab.SignIn}
          onValueChange={(value: string) => setCurrentTab(value)}
        >
          <DialogTitle>
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value={Tab.SignIn}>Вход</TabsTrigger>
              <TabsTrigger value={Tab.SignUp}>Регистрация</TabsTrigger>
            </TabsList>
          </DialogTitle>
          <DialogDescription className="flex justify-center">
            {authState.error?.message || authState.error?.validationErrors ? (
              <ErrorsAlertComponent title="произошла ошибка" />
            ) : null}
          </DialogDescription>
          <TabsContent value={Tab.SignIn} className="">
            <SignInFormComponent
              loading={authState.loading}
              verifyedCaptcha={verifyedCaptcha}
              onSubmit={handleSignIn}
            ></SignInFormComponent>
          </TabsContent>
          <TabsContent value={Tab.SignUp}>
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
                  ) : null}
                  зарегистрироваться
                </Button>
              </form>
            </Form>
          </TabsContent>
          <div className="flex flex-col space-y-4 pt-4">
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
