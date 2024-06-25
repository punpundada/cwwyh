import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import Container from "../Container";
import { navLinks } from "@/constants/navLinks";
import Link from "next/link";


const SideSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="w-8 h-8 cursor-pointer">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent side={'left'} className="w-[250px]">
        <Container className="flex-col p-1 justify-start my-16 gap-6">
          {navLinks.map((x) => {
            return (
              <SheetClose asChild key={x.id} className="h-12 w-44 rounded-xl hover:scale-125 focus:scale-125 transition-all">
                <Link href={x.path} className="text-2xl ms-4">{x.name}</Link>
              </SheetClose>
            );
          })}
        </Container>
      </SheetContent>
    </Sheet>
  );
};

export default SideSheet;
