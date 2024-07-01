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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Options = {
  value: string;
  label: string;
  id: string;
};

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

interface ComboboxController<T extends FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  options: Options[];
  placeholder: string;
  label?: string;
}

const ComboboxController = <T extends FieldValues>({
  name,
  options,
  placeholder,
  label,
  ...rest
}: ComboboxController<T>) => {
  const { control, setValue } = useFormContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild ref={triggerRef}>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between h-[36px]"
              >
                {field.value
                  ? options.find((options) =>
                      options.value
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
                    {options.map((options) => (
                      <CommandItem
                        key={options.value}
                        value={options.value}
                        onSelect={(currentValue) => {
                          setValue(
                            name,
                            (currentValue === field.value
                              ? ""
                              : currentValue) as any
                          );
                          setOpen(false);
                        }}
                      >
                        {options.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value === options.value
                              ? "opacity-100"
                              : "opacity-0"
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