"use client";
import { useAuthStore } from "@/store/auth-store";
import Container from "../Container";
import { Button } from "../ui/button";
import Link from "next/link";
import {useRouter } from "next/navigation";
import AlertDialogBox from "../AlertDialog";
import { useEffect, useLayoutEffect, useState } from "react";

const LoginButton = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const loginHandler = useAuthStore((s) => s.logOut);
  const router = useRouter();
  const logOut = () => {
    loginHandler();
    router.push("/");
  };
  
  useEffect(()=>{
    const doAction = async()=>{
      if(isLoggedIn){
        router.push('/')
      }
    }
    doAction()
  },[isLoggedIn, router])


  return (
    <Container className="justify-end w-auto mx-4">
      {isLoggedIn ? (
        <Container className="text-6xl">
          <AlertDialogBox
            triggerElement={
              <Button className="text-lg hover:translate-y-1 transition-all bg-secondary-foreground hover:bg-secondary-foreground">
                Logout
              </Button>
            }
            actionText="Logout"
            description="Are you sure you want to logout?"
            actionButtonProps={{
              onClick: logOut,
              className: "hover:bg-destructive ",
            }}
            title="Logout..."
          />
        </Container>
      ) : (
        <Button className="text-lg hover:translate-y-1 transition-all bg-secondary-foreground hover:bg-secondary-foreground">
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
    </Container>
  );
};

export default LoginButton;
