import React from "react";
import { cn } from "@/lib/utils";
import Container from "../Container";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/CWWYH.jpeg";
import Logo from "./Logo";
import { navLinks } from "@/constants/navLinks";
import SideSheet from "./SideSheet";
import LoginButton from "./LoginButton";

type navTypes = React.HTMLAttributes<HTMLDivElement>;

const NavBar = ({ className, ...props }: navTypes) => {
  return (
    <nav className={cn("bg-secondary h-full", className)} {...props}>
      <Container>
        <Container className="justify-start md:hidden mx-4 w-auto">
          <SideSheet />
        </Container>
        <Container className="justify-start ms-4">
          <Logo />
        </Container>

        <Container className="hidden justify-end h-full md:flex">
          <div className="p-3 h-full flex gap-4 justify-center align-middle">
            {navLinks.map((x) => {
              return (
                <Button
                  key={x.id}
                  // size={'lg'}
                  variant={"ghost"}
                  asChild
                  className={cn("text-lg hover:translate-y-1 hover:scale-105 transition-all")}
                >
                  <Link href={x.path} className="text-lg">
                    {x.name}
                  </Link>
                </Button>
              );
            })}
          </div>
        </Container>
            <LoginButton />
      </Container>
    </nav>
  );
};

export default NavBar;
