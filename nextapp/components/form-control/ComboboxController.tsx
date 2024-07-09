"use client";
import React, { HTMLAttributes, useRef } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Control,
  FieldValues,
  Path,
  SetFieldValue,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type Options = {
  value: string;
  label: string;
  id: string;
};

interface ComboboxController<T extends FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  options: Options[];
  placeholder: string;
  label?: string;
  description?: string | React.ReactNode;
}

const ComboboxController = <T extends FieldValues>({
  name,
  options,
  placeholder,
  label,
  description,
  ...rest
}: ComboboxController<T>) => {
  const { control, setValue } = useFormContext();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild ref={triggerRef}>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between h-[36px]"
              >
                {field.value
                  ? options.find((options) =>
                      options.id
                        .toLowerCase()
                        .includes(field.value.toLowerCase())
                    )?.label
                  : `Select ${placeholder}`}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="min-w-[300px] p-0"
              style={{ width: triggerRef?.current?.offsetWidth }}
            >
              <Command>
                <CommandInput
                  placeholder={`Search ${placeholder}...`}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No {placeholder} found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.id}
                        value={option.id}
                        onSelect={(currentValue) => {
                          setValue(
                            name,
                            (currentValue === field.value
                              ? ""
                              : currentValue) as any
                          );
                        }}
                      >
                        {option.label}
                        <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxController;

/*


*/


/*
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between h-[36px]",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)?.label
                    : `Select ${label}`}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder={`Search ${label}...`} className="h-9" />
                <CommandEmpty>No {label} found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      value={option.label}
                      key={option.value}
                      onSelect={() => {
                        setValue(name as Path<T>, option.value as any);
                      }}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          option.value === field.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
*/