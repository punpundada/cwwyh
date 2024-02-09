import { cn } from "@/lib/utils";
import React from "react";
interface containerProps extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode;
  component?: keyof JSX.IntrinsicElements;
}
const Container = ({
  children,
  className,
  component,
  ...rest
}: containerProps) => {
  return React.createElement(
    component ?? "div",
    {
      ...rest,
      className: cn(
        "mx-auto w-full h-full flex justify-center items-center",
        className
      ),
    },
    children
  );
};

export default Container;
