"use client";
import { RecipeCarousel } from "@/components/RecipeCarousel";
import Container from "@/components/Container";
import { useRecipeStore } from "@/store/recipe-store";
import { useLayoutEffect } from "react";

const RecipePage = ({ params }: { params: { id: string } }) => {
  const getRecipeById = useRecipeStore((s) => s.getRecipeById);

  useLayoutEffect(() => {
    const fethData = async () => {
      await getRecipeById(params.id);
    };
    fethData();
  }, [getRecipeById, params.id]);

  return (
    <>
      <Container className="justify-center">
        <RecipeCarousel />
      </Container>
    </>
  );
};

export default RecipePage;
