import React from "react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

interface SuccessMessageAlertProps {
  title: string;
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  buttonsName: Partial<{
    onSubmit?: string;
    onCancel?: string;
  }>;
}

const SuccessMessageAlert: React.FC<SuccessMessageAlertProps> = ({
  title,
  open,
  onSubmit,
  onCancel,
  buttonsName,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="flex flex-col justify-center w-96 h-58">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-center ">
              <div className="rounded-full bg-green-100 size-14 p-1">
                <CheckIcon className="size-12 text-green-400" />
              </div>
            </div>
          </DialogTitle>

          <DialogDescription className="self-center text-lg text-slate-600 font-semibold">
            <p>{title}!</p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center space-x-6">
          <Button
            variant="outline"
            className="border border-blue-300"
            onClick={onSubmit}
          >
            {buttonsName?.onSubmit ? buttonsName.onSubmit : "принять"}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="border border-slate-300"
          >
            {buttonsName?.onCancel ? buttonsName.onCancel : "отмена"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessMessageAlert;
