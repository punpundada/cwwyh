"use client";
import React, { HTMLAttributes, useRef } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  useFormContext,
  UseFormReturn,
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

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";

export type Options = {
  value?: string;
  label: string;
  id: string;
};

interface ComboboxController<T extends FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  options: Options[];
  placeholder: string;
  label?: string;
  description?: React.ReactNode;
}

const ComboboxController = <T extends FieldValues>({
  name,
  options,
  placeholder,
  label,
  description,
  ...rest
}: ComboboxController<T>) => {
  const [open, setOpen] = React.useState(false);
  const form = useFormContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery("md");

  if (isDesktop) {
    return (
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild ref={triggerRef}>
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
                      ? options.find((option) => option.id === field.value)?.label
                      : `Select ${placeholder}`}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="min-w-[300px] p-0"
                style={{ width: triggerRef?.current?.offsetWidth }}
              >
                <OptionList
                  field={field}
                  form={form}
                  name={name}
                  options={options}
                  setOpen={setOpen}
                  placeholder={placeholder}
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild ref={triggerRef}>
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
                    ? options.find((option) => option.id === field.value)?.label
                    : `Select ${placeholder}`}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </DrawerTrigger>
            <DrawerContent
              className="min-w-full p-0"
              style={{ width: triggerRef?.current?.offsetWidth }}
            >
              <DialogTitle>{description}</DialogTitle>
              <OptionList
                field={field}
                form={form}
                name={name}
                options={options}
                setOpen={setOpen}
                placeholder={placeholder}
              />
            </DrawerContent>
          </Drawer>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxController;

interface OptionList<T extends FieldValues> {
  placeholder?: string;
  options: Options[];
  field: ControllerRenderProps<FieldValues, Path<T>>;
  form: UseFormReturn<FieldValues, any, undefined>;
  name: Path<T>;
  setOpen: (val: boolean) => void;
}

const OptionList = React.memo(
  <T extends FieldValues>({
    placeholder,
    options,
    field,
    form,
    name,
    setOpen,
  }: OptionList<T>) => {
    return (
      <Command>
        <CommandInput placeholder={`Search ${placeholder}...`} className="h-9" />
        <CommandList>
          <CommandEmpty>No {placeholder}(s) found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                value={option.label}
                onSelect={(currentValue) => {
                  const data = options.find((x) => x.label === currentValue);
                  form.setValue(name, (data?.id === field.value ? "" : data?.id) as any);
                  if (currentValue) {
                    form.clearErrors(name);
                  }
                  setOpen(false);
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    option.id === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  }
);
