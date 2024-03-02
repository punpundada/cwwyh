"use client";
import { RecipeCarousel } from "@/components/RecipeCarousel";
import Container from "@/components/Container";
import { useRecipeStore } from "@/store/recipe-store";
import { useLayoutEffect } from "react";
import RecipeDescCard from "@/components/RecipeDescCard";

const RecipePage = ({ params }: { params: { id: string } }) => {
  const getRecipeById = useRecipeStore((s) => s.getRecipeById);

  const handleButtonClick = () => {
    const secondElement = document.getElementById("second");
    if (secondElement) {
      secondElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    const fethData = async () => {
      await getRecipeById(params.id);
    };
    fethData();
  }, [getRecipeById, params.id]);

  return (
    <>
      <Container className="mt-10 md:mt-5 lg:mt-0 p-4 md:p-0 flex-col-reverse md:flex-row relative">
        <Container className="w-full md:w-[65%] flex-col">
          <Container className="h-3/5">
              Image
          </Container>
          <Container className="h-1/4">
              Carousel
          </Container>
        </Container>
        <Container className="w-full md:w-[35%] m-6">
          <RecipeDescCard />
        </Container>
      </Container>
      <Container component="aside" id="second" className="h-screen">
        hello
      </Container>
    </>
  );
};

export default RecipePage;
