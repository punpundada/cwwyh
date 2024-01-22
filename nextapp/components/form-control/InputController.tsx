"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path, Controller } from "react-hook-form";
import Container from "../Container";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface InputControllerProps<T extends FieldValues>
  extends React.HTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  type?: "email" | "number" | "file" | "password";
}

export const InputController = <T extends FieldValues>({
  control,
  disabled,
  name,
  label,
  className,
  placeholder,
  type,
  ...rest
}: InputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      disabled={disabled}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Container className="flex-col gap-1 h-[5rem]">
            <Container className="justify-start h-auto ms-3">
              {label && <Label htmlFor={name}>{label}</Label>}
            </Container>
            <Input
              {...field}
              {...rest}
              className={cn("bottom-1 border-foreground", className, {
                "border-destructive": error,
                "focus-visible:border-foreground": error,
              })}
              name={name}
              placeholder={placeholder}
              type={type}
            />
            {error && (
              <p className="h-2 text-destructive">
                {error?.message ? `${error?.message}` : ""}
              </p>
            )}
          </Container>
        );
      }}
    />
  );
};
