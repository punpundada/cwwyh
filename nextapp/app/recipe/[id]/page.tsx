"use client";
import { RecipeCarousel } from "@/components/RecipeCarousel";
import Container from "@/components/Container";
import { useRecipeStore } from "@/store/recipe-store";
import { useLayoutEffect, useState } from "react";
import RecipeDescCard from "@/components/RecipeDescCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

const RecipePage = ({ params }: { params: { id: string } }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const getRecipeById = useRecipeStore((s) => s.getRecipeById);
  const recipe = useRecipeStore((s) => s.recipe);


  const handleImageIndex = (index: number) => {
    setImageIndex(index);
  };
  useLayoutEffect(() => {
    const fethData = async () => {
      await getRecipeById(params.id);
    };
    fethData();
  }, [getRecipeById, params.id]);

  return (
    <>
      <Container className="xl:p-1 md:mt-5 lg:mt-0 p-4 md:p-0 flex-col-reverse md:flex-row relative">
        <Container className="w-full md:w-[65%] flex-col p-0 md:p-10 lg:p-16 gap-1 md:gap-4">
          <Container className="hidden md:flex h-3/5 relative w-2/3">
            <Image
              src={recipe?.imgUrls[imageIndex].imgUrl ?? ""}
              alt="recipe image"
              fill
              className="object-cover rounded-2xl"
            />
          </Container>
          <Container className="h-1/4">
            <RecipeCarousel handleImageIndex={handleImageIndex} />
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
