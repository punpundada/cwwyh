import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IRecipe } from "@/types/IRecipe";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const RecipeCard = ({ _id, description, recipeName, imgUrls }: IRecipe) => {
  return (
<Card className={cn("w-auto h-80 flex flex-col hover:scale-[103%] transition-all")}>
  <CardHeader>
    <CardTitle>{recipeName}</CardTitle>
    <CardDescription className="line-clamp-2">
      {description}
    </CardDescription>
  </CardHeader>
  <CardContent className="relative flex-grow ">
    <Image
      src={imgUrls[0].imgUrl}
      alt={`${recipeName} image`}
      fill
      className="object-cover w-full h-full"
    />
  </CardContent>
  <CardFooter className="felx justify-start p-4">
    <Button className="bottom-0">Save</Button>
  </CardFooter>
</Card>
  );
};

export default RecipeCard;
