"use client";
import { useAuthStore } from "@/store/auth-store";
import Container from "../Container";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {useRouter } from "next/navigation";
import AlertDialogBox from "../AlertDialog";
import { useEffect } from "react";
import { checkIsLogin } from "@/services/loginService";

const LoginButton = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const loginHandler = useAuthStore((s) => s.logOut);
  const setIsLoggdin = useAuthStore((s) => s.setIsLoggedIn);
  const router = useRouter();

  const logOut = () => {
    loginHandler();
    router.push("/");
  };

  useEffect(()=>{
    if(isLoggedIn){
      router.push('/')
    }
  },[isLoggedIn, router])
  return (
    <Container className="justify-end w-auto mx-4">
      {isLoggedIn ? (
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
      ) : (
        <Button className="text-lg hover:translate-y-1 transition-all bg-secondary-foreground hover:bg-secondary-foreground">
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
    </Container>
  );
};

export default LoginButton;
