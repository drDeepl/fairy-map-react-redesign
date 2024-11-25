import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

import { CheckCircledIcon } from "@radix-ui/react-icons";

interface SuccessMessageAlertProps {
  title: string;
  visible: boolean;
  onSubmit: () => void;
}

const SuccessMessageAlert: React.FC<SuccessMessageAlertProps> = ({
  title,
  visible,
  onSubmit,
}) => {
  const handleOnSubmit = () => {
    console.log("CLICK ON SUBMIT");
    onSubmit();
  };

  return (
    <AlertDialog open={visible}>
      <AlertDialogContent className="flex flex-col justify-center items-center max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle className="self-center">
            <CheckCircledIcon className="text-green-400 size-24 drop-shadow-xl shadow-green-500/50 opacity-1" />
          </AlertDialogTitle>
          <AlertDialogDescription
            className="self-center text-center text-xl text-balance
            text-slate-800"
          >
            {title}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className=" border border-green-500 hover:bg-green-500 hover:text-white shadow-lg shadow-green-500/50"
            onClick={handleOnSubmit}
          >
            супер
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessMessageAlert;
