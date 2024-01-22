import { cn } from "@/lib/utils";
import React from "react";
interface containerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
const Container = ({ children, className, ...rest }: containerProps) => {
  return (
    <div
      {...rest}
      className={cn(
        "mx-auto w-full h-full flex justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
