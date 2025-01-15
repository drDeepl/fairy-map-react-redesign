"use client";

import React, { useCallback, useEffect, useState } from "react";
import { signIn, signUp } from "./auth.actions";

import { AppDispatch, RootState } from "@/app/store";
import {
  setError,
  setLoad,
  setSuccess,
  setVerifyedCaptcha,
} from "./auth.slice";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptchaComponent from "@/components/captcha.component";
import SignInForm from "./forms/sign-in.form.component";

import ErrorsAlertComponent from "@/components/errors-alert.component";
import SignUpFormComponent from "./forms/sign-up.form.component";

import { Components } from "@/api/schemas/client";
import { Button } from "@/components/ui/button";

import { ToastContainer, toast } from "react-toastify";
import SuccessToast from "@/components/success-toast-action.component";

enum Tab {
  SignIn = "signin",
  SignUp = "signup",
}

interface AuthFormProps {
  visible: boolean;
  onSubmit: () => Promise<void>;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ visible, onSubmit, onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  const authState = useSelector((state: RootState) => state.auth);

  const [visibleCaptcha, setVisibleCaptcha] = useState<boolean>(false);

  const [currentTab, setCurrentTab] = useState<string>(Tab.SignIn);

  const hundleSuccessCaptcha = () => {
    dispatch(setVerifyedCaptcha(true));
    setVisibleCaptcha(false);
  };

  const hundleErrorCaptcha = (error: any) => {
    console.error(error);
    dispatch(
      setError({
        message: "ошибка подтверждения капчи",
      })
    );
  };

  const handleSignUp = useCallback(
    async (values: Components.Schemas.SignUpRequestDto) => {
      console.log(authState.verifyedCaptcha);
      authState.verifyedCaptcha
        ? dispatch(signUp(values))
        : setVisibleCaptcha(true);
    },
    [authState.verifyedCaptcha]
  );

  const handleSignIn = useCallback(
    async (values: Components.Schemas.SignInRequestDto) => {
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

  // const showErrorToast = (msg: string) => {
  //   return toast({
  //     className: cn(
  //       "top-10 right-0 flex fixed w-1/3 border border-red-500 bg-red-50"
  //     ),
  //     action: (
  //       <div className="flex items-center space-x-2 w-full">
  //         <CrossCircledIcon className="size-6 text-red-500" />
  //         <span className="font-semibold text-sm">{msg}</span>
  //       </div>
  //     ),
  //   });
  // };

  const showSuccessToast = (msg: string, onClose: () => void) =>
    toast.success(
      <SuccessToast msg={msg}>
        <div className="flex flex-col items-center space-y-2">
          <Button
            onClick={handleOnClose}
            variant="secondary"
            className="bg-white text-green-500 border border-green-500"
          >
            остаться
          </Button>
        </div>
      </SuccessToast>,
      {
        closeButton: false,
        position: "top-center",
        containerId: "authFormToast",
        className:
          "p-4 w-full bg-green-50 border border-green-500 text-green-500",
        progressClassName: "bg-green-500",
        onClose: () => onClose(),
      }
    );

  useEffect(() => {
    if (authState.success) {
      const msg =
        currentTab === Tab.SignUp
          ? "Регистрация прошла успешно!"
          : "Вход выполнен успешно!";

      showSuccessToast(msg, onSubmit);
    }

    return () => {
      dispatch(setSuccess(false));
    };
  }, [authState.success]);

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
        <ToastContainer containerId="authFormToast" className="w-full p-4" />
        <Tabs
          defaultValue={currentTab}
          onValueChange={(value: string) => {
            setCurrentTab(value);
            clearForm();
          }}
        >
          <DialogTitle>
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger
                value={Tab.SignIn}
                className="data-[state=active]:border border-blue-300 data-[state=active]:text-slate-800 data-[state=active]:bg-secondary"
              >
                Вход
              </TabsTrigger>
              <TabsTrigger
                value={Tab.SignUp}
                className="data-[state=active]:border border-blue-300 data-[state=active]:text-slate-800 data-[state=active]:bg-secondary"
              >
                Регистрация
              </TabsTrigger>
            </TabsList>
          </DialogTitle>
          <DialogDescription className="flex justify-center">
            {authState.error?.message || authState.error?.validationErrors ? (
              <ErrorsAlertComponent
                title="ошибка"
                errors={{ error: [authState.error?.message] }}
              />
            ) : null}
          </DialogDescription>
          <TabsContent value={Tab.SignIn}>
            <SignInForm
              loading={authState.loading}
              onSubmit={handleSignIn}
            ></SignInForm>
          </TabsContent>
          <TabsContent value={Tab.SignUp}>
            <SignUpFormComponent
              loading={authState.loading}
              onSubmit={handleSignUp}
            />
          </TabsContent>
          <div
            className={`${
              visibleCaptcha ? "overflow-hidden" : "overflow-auto"
            }`}
          >
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
