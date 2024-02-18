"use clinet";
import React, { HTMLAttributes } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface alertProps {
  triggerElement: React.JSX.Element;
  title: string;
  description: string;
  cancelText?: string;
  actionText: string;
  cancleButtonProps?: HTMLAttributes<HTMLButtonElement>;
  actionButtonProps?: HTMLAttributes<HTMLButtonElement>;
}

const AlertDialogBox = ({
  triggerElement,
  actionText,
  cancelText,
  description,
  title,
  actionButtonProps,
  cancleButtonProps,
}: alertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerElement}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  {...cancleButtonProps}>
            {cancelText ? cancelText : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction  {...actionButtonProps}>
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
