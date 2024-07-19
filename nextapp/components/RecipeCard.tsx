"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {RecipeCardType } from "@/types/IRecipe";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { HeartIcon } from "lucide-react";
import LikesService from "@/services/likesService";

const RecipeCard = (props: RecipeCardType) => {
  const [like, setLike] = React.useState(props.isLiked);
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/recipe/${props._id}`);
  };
  const handleLike = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    isLiked: boolean,
    recipeId: string
  ) => {
    e.stopPropagation();
    if (!isLiked) {
      const data = await LikesService.like(recipeId);
      if (data.isSuccess) {
        setLike(true);
      }
    } else {
      const data = await LikesService.unlike(recipeId);
      if (data.isSuccess) setLike(false);
    }
  };
  return (
    <Card
      className={cn(
        "w-auto h-96 flex flex-col hover:scale-[103%] transition-all shadow-xl cursor-pointer"
      )}
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="my-2">
          <div className="flex justify-between">
            {props.recipeName}{" "}
            <span onClick={(e) => handleLike(e, props.isLiked, props._id)}>
              {like ? <HeartIcon fill="red" color="red" /> : <HeartIcon />}
            </span>
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-2">{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative flex-grow">
        <Image
          src={props.imgUrls?.[0].imgUrl}
          alt={`${props.recipeName} image`}
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
