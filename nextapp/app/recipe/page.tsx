"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import RecipeCard from "@/components/RecipeCard";
import RecipeService, { getAllRecipeService } from "@/services/recipeService";
import { IRecipe, RecipeCardType } from "@/types/IRecipe";
import React from "react";

const RecipePage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const [recipes, setRecipies] = React.useState<RecipeCardType[]>([]);
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];

  React.useEffect(() => {
    const fetchData = async () => {
      const data:any = await RecipeService.getRecipeCardList(page, search);
      if(data.isSuccess){
        setRecipies(data.result);
      }
    };
    fetchData();
  }, [setRecipies,page,search?.length]);

  return (
    <div className="">
      <BreadCrumbs names={["Recipe"]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {recipes.map((x) => (
          <RecipeCard {...x}  key={x._id} />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
