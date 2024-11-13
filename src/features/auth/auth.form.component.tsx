"use client";

import React, { useCallback, useEffect, useState } from "react";
import { signIn, signUp } from "./auth.actions";

import { AppDispatch, RootState } from "@/app/store";
import { setError, setLoad, setVerifyedCaptcha } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptchaComponent from "@/components/captcha.component";
import SignInFormComponent from "./forms/sign-in.form.component";

import { components } from "@/api/schema/schema";
import ErrorsAlertComponent from "@/components/errors-alert.component";
import SignUpFormComponent from "./forms/sign-up.form.component";
import { useNavigate } from "react-router-dom";
import { RouteApp } from "../../pages/constants/route.enum";

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
  const navigate = useNavigate();

  const authState = useSelector((state: RootState) => state.auth);

  const [currentTab, setCurrentTab] = useState<string>(Tab.SignIn);

  const [visibleCaptcha, setVisibleCaptcha] = useState<boolean>(false);

  const hundleSuccessCaptcha = () => {
    console.log("success captcha");
    dispatch(setVerifyedCaptcha(true));
    setVisibleCaptcha(false);
  };

  const hundleErrorCaptcha = (error: any) => {
    console.log(error);
    dispatch(setError({ message: "ошибка подтверждения капчи" }));
  };

  const handleSignUp = useCallback(
    async (values: components["schemas"]["SignUpRequestDto"]) => {
      console.log(authState.verifyedCaptcha);
      authState.verifyedCaptcha
        ? dispatch(signUp(values))
        : setVisibleCaptcha(true);
    },
    [authState.verifyedCaptcha]
  );

  const handleSignIn = useCallback(
    async (values: components["schemas"]["SignInRequestDto"]) => {
      authState.verifyedCaptcha
        ? dispatch(signIn(values))
        : setVisibleCaptcha(true);
    },
    [authState.verifyedCaptcha]
  );

  const handleOnClose = () => {
    onClose();
    clearForm();
  };

  const clearForm = async () => {
    dispatch(setLoad(false));
    dispatch(setError(null));
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
      <DialogContent className="max-w-sm p-9">
        <Tabs
          defaultValue={Tab.SignIn}
          onValueChange={(value: string) => {
            clearForm();
            setCurrentTab(value);
          }}
        >
          <DialogTitle>
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value={Tab.SignIn}>Вход</TabsTrigger>
              <TabsTrigger value={Tab.SignUp}>Регистрация</TabsTrigger>
            </TabsList>
          </DialogTitle>
          <DialogDescription className="flex justify-center">
            {authState.error?.message || authState.error?.validationErrors ? (
              <ErrorsAlertComponent
                title="ошибка"
                errors={{ cdjqcndjq: [authState.error?.message] }}
              />
            ) : null}
          </DialogDescription>
          <TabsContent value={Tab.SignIn} className="">
            <SignInFormComponent
              loading={authState.loading}
              onSubmit={handleSignIn}
            ></SignInFormComponent>
          </TabsContent>
          <TabsContent value={Tab.SignUp}>
            <SignUpFormComponent
              loading={authState.loading}
              onSubmit={handleSignUp}
            />
          </TabsContent>
          {visibleCaptcha ? (
            <CaptchaComponent
              onSuccessVerify={hundleSuccessCaptcha}
              onErrorVerify={hundleErrorCaptcha}
            />
          ) : null}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
