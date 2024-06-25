"use client";
import { useRecipeStore } from "@/store/recipe-store";
import { useLayoutEffect } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { Cookie, AlarmClock, CookingPot, Flame } from "lucide-react";
const RecipePage = ({ params }: { params: { id: string } }) => {
  const getRecipeById = useRecipeStore((s) => s.getRecipeById);
  const recipe = useRecipeStore((s) => s.recipe);

  useLayoutEffect(() => {
    const fethData = async () => {
      await getRecipeById(params.id);
    };
    fethData();
  }, [getRecipeById, params.id]);

  if (!recipe) {
    return <>...Loading</>;
  }

  return (
    <>
      <BreadCrumbs names={["Recipe", "id"]} />
      <div className="h-screen w-full flex justify-center">
        <Card className="w-[95%] md:w-[700px]">
          <CardHeader className="relative h-[350px] md:h-[400px]">
            <Image
              src={recipe?.imgUrls[0].imgUrl}
              alt={recipe.recipeName ?? ""}
              fill
              className="object-cover rounded-t-xl"
            />
          </CardHeader>
          <CardContent>
            <Container className="pt-4 flex-col h-auto justify-start items-start gap-4">
              <p className="text-3xl font-bold">{recipe?.recipeName}</p>
              <span className="italic py-3">Recipe by {recipe?.user.userName}</span>
              <Separator />

              <Container className="h-auto justify-evenly text-xs md:text-base">
                <span>Course: {"Breakfast"}</span>/<span>Course: {"Breakfast"}</span>/
                <span>Course: {"Breakfast"}</span>
              </Container>

              <Container className="h-full border flex-col md:flex-row">
                <Container className="w-1/2 h-32">
                  <Container className="w-1/2  gap-2 flex-col border-r md:border-r-0">
                    <Cookie />
                    <span>Serving</span>
                    <strong>{4} Servings</strong>
                  </Container>
                  <Container className="w-1/2 gap-2 flex-col md:border-r md:border-l">
                    <AlarmClock />
                    <span>Prep Time</span>
                    <strong>{"5 mins"}</strong>
                  </Container>
                </Container>

                <Container className="w-1/2  h-32">
                  <Container className="w-1/2 gap-2 border-r flex-col">
                    <CookingPot />
                    <span>Cooking Time</span>
                    <strong>{"15 Mins"}</strong>
                  </Container>
                  <Container className="w-1/2 gap-2 flex-col">
                    <Flame />
                    <span>Calories</span>
                    <strong>{"350 "}Kcal</strong>
                  </Container>
                </Container>
              </Container>

            </Container>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RecipePage;

/*
      <Container className="relative h-2/5 w-full md:w-3/5">
        <Image
          src={recipe?.imgUrls[0].imgUrl}
          alt={recipe.recipeName ?? ""}
          fill
          className="object-cover rounded-t-xl"
        />
      </Container>
      <Container className="p-4 flex-col h-auto justify-start items-start md:w-3/5 border gap-4">
        <p className="text-3xl font-bold">{recipe?.recipeName}</p>
        <span className="italic py-3">Recipe by {recipe?.user.userName}</span>
        <Separator />
        <Container className="h-auto justify-between items-start text-sm md:px-36"></Container>
      </Container>
*/
