import React, { HTMLAttributes } from "react";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextAreatController<T extends FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  placeholder: string;
  description?: string;
}

const TextAreatController = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  ...rest
}: TextAreatController<T>) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn("resize-none", rest.className)}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextAreatController;
