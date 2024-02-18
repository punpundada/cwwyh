"use client";
import React from "react";
import logo from "@/public/CWWYH.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
const Logo = () => {
  const route = useRouter();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            src={logo}
            alt="logo"
            className="w-14 h-14 object-cover rounded-3xl"
            width={50}
            height={50}
            onClick={() => route.push("/")}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Home</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Logo;
