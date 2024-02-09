import React from "react";
import Container from "../Container";
import '@/components/home-sub-pages/home-page.css';
const Page1 = () => {
  return (
    <Container className="" >
      <Container className="w-1/2 sm:hidden md:flex">
        image
      </Container>
      <Container className="w-1/2">
        SIgnup FOrm
      </Container>
    </Container>
  );
};

export default Page1;
