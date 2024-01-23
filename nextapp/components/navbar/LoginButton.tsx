"use client";
import { authStore } from "@/store/auth-store";
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
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const isLoggedIn = authStore((s) => s.isLoggedIn);
  const loginHandler = authStore((s) => s.logOut);
  const router = useRouter();
  const logOut = () => {
    loginHandler();
    router.push("/");
  };
  return (
    <Container className="justify-end w-auto mx-4">
      {isLoggedIn ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-lg hover:translate-y-1 transition-all bg-secondary-foreground hover:bg-secondary-foreground">
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Logout...</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancle</AlertDialogCancel>
              <AlertDialogAction onClick={logOut}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button className="text-lg hover:translate-y-1 transition-all bg-secondary-foreground hover:bg-secondary-foreground">
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
    </Container>
  );
};

export default LoginButton;
