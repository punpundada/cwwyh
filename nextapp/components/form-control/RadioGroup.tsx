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
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";

interface RadioGroupController<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  options: { value: string; label: string }[];
  row?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
}

const RadioGroupController = <T extends FieldValues>({
  name,
  label,
  options,
  row,
  defaultValue,
}: RadioGroupController<T>) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          <FormItem
            className={cn("space-y-3", {
              flex: row,
              "gap-1": row,
              "items-center": row,
              "justify-center": row,
              "space-x-3":row
            })}
          >
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl defaultValue={defaultValue}>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={cn("flex flex-col space-y-3", {
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
                    <FormLabel className="font-normal hover:cursor-pointer hover:underline">
                      {option.label}
                    </FormLabel>
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
