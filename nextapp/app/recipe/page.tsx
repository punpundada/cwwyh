"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import RecipeCard from "@/components/RecipeCard";
import { getAllRecipeService } from "@/services/recipeService";
import { IRecipe } from "@/types/IRecipe";
import React from "react";

const RecipePage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const [recipes, setRecipies] = React.useState<IRecipe[]>([]);
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRecipeService(page, search);
      setRecipies(data?.data.recipes ?? []);
    };
    fetchData();
  }, [setRecipies,page,search?.length]);

  return (
    <div className="">
      <BreadCrumbs names={["Recipe"]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {recipes.map((x) => (
          <RecipeCard {...x} key={x._id} />
        ))}
        {/* <Container className="w-1/4 h-min md:h-full mt-[10rem] md:mt-0 static md:p-8">
          <SearchRecipe />
        </Container> */}
      </div>
    </div>
  );
};

export default RecipePage;
