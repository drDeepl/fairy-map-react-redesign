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

import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaptchaComponent from "@/components/captcha.component";
import SignInForm from "./forms/sign-in.form.component";

import ErrorsAlertComponent from "@/components/errors-alert.component";
import SignUpFormComponent from "./forms/sign-up.form.component";
import { useNavigate } from "react-router-dom";

import { getRoutePageByUserRole } from "@/common/helpers/page.helper";
import { Components } from "@/api/schemas/client";
import { Button } from "@/components/ui/button";
import SuccessMessageAlert from "@/components/success-message-alert.component";

enum Tab {
  SignIn = "signin",
  SignUp = "signup",
}

interface AuthFormProps {
  visible: boolean;
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ visible, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state: RootState) => state.auth);

  const [visibleCaptcha, setVisibleCaptcha] = useState<boolean>(false);

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

  const [showDialogSuccessAuth, setShowDialogSuccessAuth] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (authState.success) {
      // navigate(getRoutePageByUserRole(authState.user!.role));

      setShowDialogSuccessAuth(true);
    }

    return () => {
      dispatch(setSuccess(false));
    };
  }, [authState.success]);

  const [currentTab, setCurrentTab] = useState<string>(Tab.SignIn);

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
          defaultValue={currentTab}
          onValueChange={(value: string) => {
            setCurrentTab(value);
            clearForm();
          }}
        >
          <SuccessMessageAlert
            title={
              currentTab === Tab.SignIn
                ? `Добро пожаловать`
                : "Вы успешно зарегистрировались"
            }
            open={showDialogSuccessAuth}
            onSubmit={() =>
              navigate(getRoutePageByUserRole(authState.user!.role))
            }
            onCancel={() => {
              onClose();
              setShowDialogSuccessAuth(false);
            }}
            buttonsName={{
              onSubmit: "в личный кабинет",
              onCancel: "остаться на странице",
            }}
          />
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
                errors={{ cdjqcndjq: [authState.error?.message] }}
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
