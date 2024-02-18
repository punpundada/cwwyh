"use client";
import React from "react";
import Container from "./Container";
import { InputController } from "./form-control/InputController";
import { useForm } from "react-hook-form";
import { ILoginReq, loginSchema } from "@/types/loginReq";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "./ui/use-toast";
import { Form } from "./ui/form";
import Link from "next/link";

const LoginForm = () => {
  const login = useAuthStore((s) => s.login);
  const { toast } = useToast();
  const isLoading = useAuthStore((s) => s.isLoading);
  const form = useForm<ILoginReq>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });
  const { control, handleSubmit } = form;
  const onSubmit = async (data: ILoginReq) => {
    const res = login(data);
    if (await res) {
      toast({
        title: "Success",
        description: "Login Successfully",
        duration: 10000,
      });
    }
  };

  return (
    <Container className="w-full h-full flex-col">
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Container className="gap-8 justify-start py-24 flex-col w-3/4 h-full md:justify-center md:py-0 md:w-1/2">
          <InputController
            control={control}
            name="email"
            placeholder="Email"
            type="email"
            className="h-16 text-xl md:h-10 md:text-base w-full"
          />
          <InputController
            control={control}
            name="password"
            placeholder="password"
            type="password"
            className="h-16 text-xl md:h-10 md:text-base"
          />
          <Button
            type="submit"
            variant={"outline"}
            className=" w-full h-12 text-xl md:h-10 md:text-base"
            disabled={isLoading}
          >
            Login
          </Button>
        </Container>
      </form>
    </Form>
     <p className="text-xl pt-4">Do not  have an account? <strong>
      <Link href={'/signup'}>click here</Link>
      </strong></p>
    </Container>
  );
};

export default LoginForm;
