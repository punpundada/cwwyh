"use client";
import { RecipeCarousel } from "@/components/RecipeCarousel";
import Container from "@/components/Container";
import { useRecipeStore } from "@/store/recipe-store";
import { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const RecipePage = ({ params }: { params: { id: string } }) => {
  const [continueReading, setContinueReading] = useState(false);

  const getRecipeById = useRecipeStore((s) => s.getRecipeById);
  const recipe = useRecipeStore((s) => s.recipe);

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
      <Container className="mt-10 md:mt-5 lg:mt-0 p-4 md:p-0 flex-col relative">
        <Container className=" h-20 font-extrabold text-6xl">
          {recipe?.recipeName}
        </Container>
        <Container className="justify-start md:justify-center flex-col md:flex-row gap-4 md:gap-14 lg:gap-4 mt-8">
          <Container className="h-auto md:h-full w-full md:w-1/2 items-start">
            <RecipeCarousel />
          </Container>
          <Container className="h-auto md:h-full w-full md:w-1/2 mr-4 items-start">
            <Card className={cn("min-h-max")}>
              <CardHeader>
                <CardTitle>{recipe?.recipeName}</CardTitle>
                <CardDescription>A Recipe by {recipe?.userId};</CardDescription>
              </CardHeader>
              <CardContent>
                <text
                  className={cn("line-clamp-6", {
                    "line-clamp-none": continueReading,
                  })}
                >
                  {recipe?.description}
                </text>
                <Button
                  variant={"link"}
                  className="hidden md:block size-auto"
                  onClick={() => setContinueReading((p) => !p)}
                >
                  {continueReading ? "fold" : "continue reading..."}
                </Button>
              </CardContent>
            </Card>
          </Container>

          <Button
            variant={"ghost"}
            className="animate-bounce absolute top-[80%] rounded-full w-auto"
            onClick={handleButtonClick}
          >
            <MoveDown />
            More
          </Button>
        </Container>
      </Container>

      <Container id="second" className="">
        hello
      </Container>
    </>
  );
};

export default RecipePage;
