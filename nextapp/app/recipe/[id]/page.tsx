"use client";
import { useRecipeStore } from "@/store/recipe-store";
import { useLayoutEffect } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Card, CardHeader, CardContent,CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Container from "@/components/Container";
import { Separator } from "@/components/ui/separator";
import { Cookie, AlarmClock, CookingPot, Flame, Circle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      <div className=" w-full flex justify-center">
        <Card className="w-[95%] md:w-4/6">
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

              <ScrollArea className="h-36">{recipe.description}</ScrollArea>

              <div className="bg-accent w-full p-4">
                <strong className="text-lg">INGREDIENTS</strong>
                <Container className="flex-col gap-3 pt-5 items-start">
                  {recipe.ingredientsList.map((ingredient) => (
                    <Container key={ingredient._id} className="justify-start gap-4">
                      <Circle />
                      <span>{ingredient.quantity}</span>
                    </Container>
                  ))}
                </Container>
              </div>

              <div className="bg-accent w-full p-4">
              <strong className="text-lg">DIRECTIONS</strong>
                <Container className="flex-col gap-3 pt-5 items-start">
                  {recipe.steps.map((step,index) => (
                    <Container key={step.step} className="justify-start gap-4">
                      <span>{index+1}</span>
                      <span>{step.step}</span>
                    </Container>
                  ))}
                </Container>
              </div>
            </Container>

          </CardContent>
          <CardFooter>
            <p>NOTES</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RecipePage;