'use client'
import Container from "@/components/Container";
import getAllRecipeService from "@/services/recipeService";
import { useRecipeStore } from "@/store/recipe-store";
import React from "react";

const RecipePage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const getRecipes = useRecipeStore(s=>s.getRecipes);
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];
  const res = getRecipes(page,search);
  // const res = await getAllRecipeService(page,search);
  if(!res) return null
  return (
    <Container className="flex-col-reverse gap-4 md:flex-row relative">
      <Container className="w-3/4 sticky">cards</Container>
      <Container className="w-1/4 h-min md:h-full">search filed</Container>
    </Container>
  );
};

export default RecipePage;
