"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { signIn, signUp } from "./auth.actions";

import { AppDispatch, RootState } from "@/app/store";
import {
  setError,
  setLoad,
  setSuccess,
  setVerifyedCaptcha,
} from "./auth.slice";
import { useDispatch, useSelector } from "react-redux";

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptchaComponent from "@/components/captcha.component";
import SignInForm from "./forms/sign-in.form.component";

import ErrorsAlertComponent from "@/components/errors-alert.component";
import SignUpFormComponent from "./forms/sign-up.form.component";
import { useNavigate } from "react-router-dom";

import { Components } from "@/api/schemas/client";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { getRoutePageByUserRole } from "@/common/helpers/page.helper";
import { Cross1Icon } from "@radix-ui/react-icons";

enum Tab {
  SignIn = "signin",
  SignUp = "signup",
}

interface AuthFormProps {
  visible: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ visible, onSubmit, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state: RootState) => state.auth);

  const [visibleCaptcha, setVisibleCaptcha] = useState<boolean>(false);

  const [currentTab, setCurrentTab] = useState<string>(Tab.SignIn);

  const notifyAuth = (msg: string) => {
    toast.custom((t) => {
      return (
        <div
          className={`flex flex-col w-full justify-items-center bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg ${
            t.visible ? "animate-zoom-in" : "animate-zoom-out"
          }`}
        >
          <p className="text-lg font-semibold flex justify-between">
            <span>{msg}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                toast.dismiss(t.id);
                onClose();
              }}
            >
              <Cross1Icon className="" />
            </Button>
          </p>
          <Button
            variant="outline"
            className="text-sm self-start"
            onClick={() => {
              toast.dismiss(t.id);
              onClose();
              navigate(getRoutePageByUserRole(authState.user!.role));
            }}
          >
            личный кабинет
          </Button>
        </div>
      );
    });
  };

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

  useEffect(() => {
    if (authState.success) {
      onSubmit();
      notifyAuth(
        currentTab === Tab.SignUp
          ? "Регистрация прошла успешно!"
          : "Вход выполнен успешно!"
      );
      // navigate(getRoutePageByUserRole(authState.user!.role));
      // setShowDialogSuccessAuth(true);
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
        <Toaster />
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
          <TabsContent value={Tab.SignIn} className="">
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
          <TabsContent value={"success"}>
            <Button>в личный кабинет</Button>
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
