"use client";
import React from "react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Container from "./Container";
import { InputController } from "./form-control/InputController";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ISignupReq, signupSchema } from "@/types/ISignupReq";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IsignupForm {
  className?: string;
}

const SignupForm = ({ className }: IsignupForm) => {
  const signup = useAuthStore((s) => s.signup);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ISignupReq>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: ISignupReq) => {
    const res = await signup(data);
    if (res?.isSuccess) {
      toast({
        title: "Success",
        description: "Signup was Successfully!! Welcome.",
        duration: 10000,
      });
      router.push("/login");
    }
  };
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Signup to CWWYH and descover new recipies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <Container
            component="form"
            className="w-full h-full flex-col gap-7 md:gap-5 md:h-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputController
              control={form.control}
              name="firstName"
              placeholder="First Name"
              type="text"
            />
            <InputController
              control={form.control}
              name="lastName"
              placeholder="Last Name"
              type="text"
            />
            <InputController
              control={form.control}
              name="email"
              placeholder="Email"
              type="email"
            />
            <InputController
              control={form.control}
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button type="submit" variant={"outline"} className="w-full">
              Signup
            </Button>
          </Container>
        </Form>
      </CardContent>
      <CardFooter className="text-base">
        Already have a account? <strong>
          <Link href={'/login'}>&nbsp;&nbsp;login</Link>
        </strong>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
