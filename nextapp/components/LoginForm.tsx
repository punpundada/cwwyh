"use client";
import React from "react";
import Container from "./Container";
import { InputController } from "./form-control/InputController";
import { useForm } from "react-hook-form";
import { ILoginReq, loginSchema } from "@/types/loginReq";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "./ui/button";
import useLogin from "@/hooks/useLogin";

const LoginForm = () => {
  const setData = useLogin();
  const { control, handleSubmit } = useForm<ILoginReq>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ILoginReq) => {
    // const res = await loginService(data);
    // if (res.isSuccess) {
    //   setValue(res.data.accessToken);
    //   toast({ title: "Success", description: res.data.message, className: "" });
    //   router.push('/')
    // }
    setData(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
      <Container className="gap-8 justify-start py-24 flex-col w-3/4 h-full md:justify-center md:py-0 md:w-1/2">
        <InputController
          control={control}
          name="email"
          placeholder="Email"
          type="email"
          className="h-16 text-xl md:h-10 md:text-base"
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
          variant={"secondary"}
          className=" w-full h-12 text-xl md:h-10 md:text-base"
        >
          Login
        </Button>
      </Container>
    </form>
  );
};

export default LoginForm;
