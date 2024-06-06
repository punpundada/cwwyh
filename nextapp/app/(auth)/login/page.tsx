import Container from "@/components/Container";
import LoginForm from "@/components/LoginForm";
import React from "react";
import loginImg from '@/assets/undraw_fingerprint_login_re_t71l.svg';
import Image from "next/image";

const LoginPage = () => {
  return (
    <Container className="w-full h-full">
      <Container className="w-1/2 h-full hidden md:flex">
          <Image src={loginImg} width={500} height={500} alt="login image" />
      </Container>
      <Container className="w-full h-full md:w-1/2">
          <LoginForm/>
      </Container>
    </Container>
  );
};

export default LoginPage
