import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

interface DialogFormProps {
  open: boolean;
  title: string;
  description: string;

  children?: React.ReactNode;
}

const DialogForm: React.FC<DialogFormProps> = ({
  open,
  title,
  description,
  children,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="z-50">
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-center leading-6">{title}</DialogTitle>
          <DialogDescription className="flex items-center space-x-4 text-center border border-slate-400 rounded-md p-2 shadow-md">
            <ExclamationTriangleIcon className="size-6" />
            <span>{description}</span>
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
