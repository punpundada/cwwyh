"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChefHat, Clock4, Salad } from "lucide-react";
import Container from "./Container";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { useRecipeStore } from "@/store/recipe-store";
import { ScrollArea } from "./ui/scroll-area";

const RecipeDescCard = () => {
  const recipe = useRecipeStore((s) => s.recipe);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{recipe?.recipeName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Container className="flex-col gap-8">
          <Container className="justify-between">
            <Container className="flex-col">
              <Clock4
                id="clock"
                size={40}
                strokeWidth={1.75}
                absoluteStrokeWidth
              />
              <label htmlFor="clock">{recipe?.prepTime}</label>
            </Container>
            <Container className="flex-col">
              <Salad size={40} strokeWidth={1.75} absoluteStrokeWidth />
              <label htmlFor="clock">{recipe?.ingredientsList?.length}</label>
            </Container>
            <Container className="flex-col">
              <ChefHat size={40} strokeWidth={1.75} absoluteStrokeWidth />
              <label htmlFor="clock">{recipe?.user.userId}</label>
            </Container>
          </Container>
          <Container className="flex-col h-56">
            <Separator className="mb-5" />
            <ScrollArea>{recipe?.description}</ScrollArea>
          </Container>
        </Container>
      </CardContent>
      <CardFooter>
        <Container>
          <Button size={"sm"} variant={"outline"}>
            Read More
          </Button>
        </Container>
      </CardFooter>
    </Card>
  );
};

export default RecipeDescCard;
