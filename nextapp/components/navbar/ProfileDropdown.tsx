import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { CircleUserRound } from "lucide-react";

interface ProfileDropdown {}

const ProfileDropdown = (props: ProfileDropdown) => {
  const { setTheme, theme } = useTheme();

  const [open, setOpen] = React.useState(false);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const logOut = useAuthStore((s) => s.logOut);
  const user = useAuthStore((s) => s.user);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="mx-4">
          <Avatar className="flex justify-center items-center">
            {isLoggedIn && user ? (
              <AvatarImage src={user?.imgUrl} />
            ) : (
              <AvatarImage asChild>
                <CircleUserRound />
              </AvatarImage>
            )}
            <AvatarFallback>
              {user
                ? user?.firstName?.[0].toUpperCase() ??
                  +user?.lastName?.[0]?.toUpperCase()
                : "cn"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {isLoggedIn && (
            <>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuGroup>
            {isLoggedIn && (
              <>
                <DropdownMenuItem asChild>
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/settings"}>Settings</Link>
                </DropdownMenuItem>
              </>
            )}
            {isLoggedIn ? (
              <DropdownMenuItem asChild>
                <DropdownMenuItem onClick={() => setOpen(true)}>Logout</DropdownMenuItem>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link href={"/login"}>Login</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem
                    checked={theme === "system"}
                    onClick={() => setTheme("system")}
                  >
                    System
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === "light"}
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === "dark"}
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>Are you sure...?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={logOut} variant={"destructive"}>
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileDropdown;
