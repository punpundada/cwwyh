import Container from "@/components/Container";
import React from "react";

const RecipePage = () => {
  return (
    <Container className="flex-col-reverse gap-4 md:flex-row relative">
      <Container className="w-3/4 sticky">cards</Container>
      <Container className="w-1/4 h-min md:h-full">search filed</Container>
    </Container>
  );
};

export default RecipePage;
