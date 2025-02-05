"use client";

import React, { useCallback, useState } from "react";
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
import NotifyContainer, {
  Notification,
} from "../../components/notificaiton.component";

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
    addNotification({
      type: "error",
      message: "ошибка подтверждения каптчи",
    });
  };

  const handleSignUp = async (values: Components.Schemas.SignUpRequestDto) => {
    dispatch(signUp(values)).then((action: any) => {
      const user: JwtPayload = parsePayloadFromAccessToken(
        action.payload.accessToken
      );

      addNotification({
        type: "success",
        message: "Регистрация прошла успешно!",
        action: (
          <div className="flex justify-end">
            <Button onClick={() => navigate(getRoutePageByUserRole(user.role))}>
              в личный кабинет
            </Button>
          </div>
        ),
      });
    });
  };

  const handleSignIn = async (values: Components.Schemas.SignInRequestDto) => {
    dispatch(signIn(values)).then((action: any) => {
      const user: JwtPayload = parsePayloadFromAccessToken(
        action.payload.accessToken
      );

      addNotification({
        type: "success",
        message: "Вход выполнен успешно!",
        action: (
          <div className="flex justify-end">
            <Button
              variant="link"
              className="p-0 m-0 text-green-500"
              onClick={() => navigate(getRoutePageByUserRole(user.role))}
            >
              в личный кабинет
            </Button>
          </div>
        ),
      });
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

  const handleTabsValueChange = async (value: string) => {
    setCaptchaState({
      open: false,
      verifyed: false,
    });
    setCurrentTab(value);
    clearForm();
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notify) => notify.id !== id));
    onClose();
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const newNotification: Notification = {
        ...notification,
        id: `notify-auth-${Date.now()}`,
      };

      setNotifications([newNotification]);
    },
    []
  );

  return (
    <div className="px-6 py-4">
      <div className="relative">
        <NotifyContainer
          notifications={notifications}
          onRemove={removeNotification}
        />
      </div>
      <Tabs defaultValue={currentTab} onValueChange={handleTabsValueChange}>
        <div className="flex flex-col items-center p-0 m-0">
          <Button
            className="absolute top-0 right-0"
            size="icon"
            variant="link"
            onClick={handleOnClose}
          >
            <Cross1Icon className="text-slate-600" />
          </Button>
          <TabsList className="grid grid-cols-2 mb-2 space-x-4 center">
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
        <TabsContent value={Tab.SignIn}>
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
                        <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
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
        <TabsContent value={Tab.SignUp} className="animate-fade-in">
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
                        <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
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
  );
};

export default AuthForm;
