"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path, Controller, FormProvider } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InputControllerProps<T extends FieldValues>
  extends React.HTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  type?: "email" | "number" | "file" | "password" | 'text' | "file";
  formDescription?:React.ReactNode
}

export const InputController = <T extends FieldValues>({
  control,
  disabled,
  name,
  label,
  className,
  placeholder,
  type,
  formDescription,
  ...rest
}: InputControllerProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl className="w-full">
            <Input placeholder={placeholder} {...field} {...rest} type={type} className={cn('w-full',className)}/>
          </FormControl>
          {formDescription && <FormDescription>{formDescription}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
