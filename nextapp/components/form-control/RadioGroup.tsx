import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface RadioGroupController<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: { value: string; label: string }[];
  row?: boolean;
}

const RadioGroupController = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  row,
}: RadioGroupController<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <FormItem className="space-y-3">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={cn("flex flex-col space-y-1", {
                  "flex-row": row,
                })}
              >
                {options.map((option) => (
                  <FormItem
                    className={cn("flex items-center space-x-3 space-y-0")}
                    key={option.value}
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">{option.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  );
};

export default RadioGroupController;
