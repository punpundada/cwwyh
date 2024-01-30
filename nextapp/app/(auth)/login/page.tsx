import Container from "@/components/Container";
import LoginForm from "@/components/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <Container className="w-full h-full">
      <Container className="w-1/2 h-full hidden md:flex">
        image/carousel
      </Container>
      <Container className="w-full h-full md:w-1/2">
          <LoginForm/>
      </Container>
    </Container>
  );
};

export default LoginPage
