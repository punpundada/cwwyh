"use client";
import React, { HTMLAttributes, useRef } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  FieldValues,
  Path,
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
  const { control, setValue ,clearErrors} = useFormContext();
  const triggerRef = useRef<HTMLButtonElement>(null);


  return (
    <FormField
      name={name}
      control={control}
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
                          setValue(
                            name,
                            (data?.id === field.value ? "" : data?.id) as any
                          );
                          if(currentValue){
                            clearErrors(name)
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
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxController;
