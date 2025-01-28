"use client";

import React, { useState } from "react";
import { signIn, signUp } from "./auth.actions";

import { AppDispatch, RootState } from "@/app/store";
import { JwtPayload, setError, setLoad } from "./auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { Components } from "@/api/schemas/client";

import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptchaComponent from "@/components/captcha.component";
import SignInForm from "./forms/sign-in.form.component";

import ErrorsAlertComponent from "@/components/errors-alert.component";
import SignUpFormComponent from "./forms/sign-up.form.component";

import { Button } from "@/components/ui/button";

import { ToastContainer, toast } from "react-toastify";
import SuccessToast from "@/components/success-toast-action.component";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRoutePageByUserRole } from "@/common/helpers/page.helper";
import { useNavigate } from "react-router-dom";
import { parsePayloadFromAccessToken } from "@/common/helpers/token.helper";
enum Tab {
  SignIn = "signin",
  SignUp = "signup",
}

interface AuthFormProps {
  onClose: () => void;
}

interface CaptchaState {
  open: boolean;
  verifyed: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();

  const authState = useSelector((state: RootState) => state.auth);

  const [captchaState, setCaptchaState] = useState<CaptchaState>({
    open: false,
    verifyed: false,
  });

  const [currentTab, setCurrentTab] = useState<string>(Tab.SignIn);

  const hundleSuccessCaptcha = () => {
    setCaptchaState({ open: true, verifyed: true });
  };

  const hundleErrorCaptcha = () => {
    showErrorToast("ошибка подтверждения каптчи");
  };

  const handleSignUp = async (values: Components.Schemas.SignUpRequestDto) => {
    dispatch(signUp(values)).then((action: any) => {
      const user: JwtPayload = parsePayloadFromAccessToken(
        action.payload.accessToken
      );
      const msg = "Регистрация прошла успешно!";

      showSuccessToast(msg, () => navigate(getRoutePageByUserRole(user.role)));
    });
  };

  const handleSignIn = async (values: Components.Schemas.SignInRequestDto) => {
    dispatch(signIn(values)).then((action: any) => {
      const user: JwtPayload = parsePayloadFromAccessToken(
        action.payload.accessToken
      );
      const msg = "Вход выполнен успешно!";

      showSuccessToast(msg, () => navigate(getRoutePageByUserRole(user.role)));
    });
  };

  const handleOnClose = () => {
    onClose();
    clearForm();
  };

  const clearForm = async () => {
    dispatch(setLoad(false));
    dispatch(setError(null));
  };

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

  const showErrorToast = (msg: string) =>
    toast.error(msg, {
      closeButton: false,
      position: "top-center",
      containerId: "authFormToast",
      className: "p-4 w-full bg-red-50 border border-red-500 text-red-500",
      progressClassName: "bg-red-500",
      onClose: () => onClose(),
    });

  // useEffect(() => {
  //   if (authState.success) {
  //     const msg =
  //       currentTab === Tab.SignUp
  //         ? "Регистрация прошла успешно!"
  //         : "Вход выполнен успешно!";

  //     showSuccessToast(msg, onSubmit);
  //   }

  //   return () => {
  //     dispatch(setSuccess(false));
  //   };
  // }, [authState.success]);

  const handleTabsValueChange = async (value: string) => {
    setCaptchaState({
      open: false,
      verifyed: false,
    });
    setCurrentTab(value);
    clearForm();
  };

  return (
    // <DialogContent className="max-w-sm px-8 pt-1 [&>button]:hidden transition-transform duration-500 transform">
    <div>
      <ToastContainer containerId="authFormToast" className="w-full p-4" />
      <Tabs defaultValue={currentTab} onValueChange={handleTabsValueChange}>
        <div className="flex flex-col items-center p-0 m-0">
          <Button
            className="absolute right-0 top-0"
            size="icon"
            variant="link"
            onClick={handleOnClose}
          >
            <Cross1Icon className="text-slate-600" />
          </Button>
          <TabsList className="grid w-64 center space-x-4 grid-cols-2 mb-2">
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
        </div>
        <div className="flex justify-center">
          {authState.error?.message || authState.error?.validationErrors ? (
            <ErrorsAlertComponent
              title="ошибка"
              errors={{ error: [authState.error?.message] }}
            />
          ) : null}
        </div>
        <TabsContent value={Tab.SignIn} className="animate-zoom-in">
          <SignInForm loading={authState.loading} onSubmit={handleSignIn}>
            <TooltipProvider
              delayDuration={captchaState.verifyed ? 1000000 : 0}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full">
                    <Button
                      disabled={authState.loading || !captchaState.verifyed}
                      type="submit"
                      className="w-full"
                    >
                      {authState.loading ? (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      войти
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  для продолжения необходимо подтвердить, что вы не робот
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SignInForm>
        </TabsContent>
        <TabsContent value={Tab.SignUp} className="animate-zoom-in">
          <SignUpFormComponent
            loading={authState.loading}
            onSubmit={handleSignUp}
          >
            <TooltipProvider
              delayDuration={captchaState.verifyed ? 1000000 : 0}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full">
                    <Button
                      disabled={authState.loading || !captchaState.verifyed}
                      type="submit"
                      className="w-full"
                    >
                      {authState.loading ? (
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      зарегистрироваться
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  для продолжения необходимо подтвердить, что вы не робот
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SignUpFormComponent>
        </TabsContent>
        <div className="flex justify-center pt-1">
          {captchaState.verifyed ? null : (
            <CaptchaComponent
              onSuccessVerify={hundleSuccessCaptcha}
              onErrorVerify={hundleErrorCaptcha}
            />
          )}
        </div>
      </Tabs>
    </div>
    //  </DialogContent>
  );
};

export default AuthForm;
