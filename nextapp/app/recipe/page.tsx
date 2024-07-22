"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import RecipeCard from "@/components/RecipeCard";
import { useRecipeStore } from "@/store/recipe-store";
import React from "react";

const RecipePage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const getRecipeCardList = useRecipeStore(s=>s.getRecipeCardList);
  const recipeCardList = useRecipeStore(s=>s.recipeCardList);
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];

  React.useEffect(() => {
    const fetchData = async () => {
      getRecipeCardList(page,search);
    };
    fetchData();
  }, [page,search?.length]);

  return (
    <div className="">
      <BreadCrumbs names={["Recipe"]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {recipeCardList.map((x) => (
          <RecipeCard {...x}  key={x._id} />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
