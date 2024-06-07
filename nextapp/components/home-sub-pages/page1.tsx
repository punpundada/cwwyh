import React from "react";
import Container from "../Container";
import "@/components/home-sub-pages/home-page.css";
import Image from "next/image";
// import img from '@/assets/micheile-henderson-3YHXTs1CxFI-unsplash.jpg'
import img from '@/assets/undraw_cooking_p7m1.svg'
import SignupForm from "../SignupForm";
const Page1 = () => {
  return (
    <Container className="w-screen">
      <Container className="hidden md:flex md:w-1/2 relative">
        <Image src={img} alt='side image'  className="object-cover p-4 rounded-3xl " />
      </Container>
      <Container className="w-full md:w-1/2 h-full">
        <div className="w-5/6 md:w-3/4">
        <SignupForm/>
        </div>
      </Container>
    </Container>
  );
};

export default Page1;
