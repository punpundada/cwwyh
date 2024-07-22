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
import { RecipeCardType } from "@/types/IRecipe";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { HeartIcon } from "lucide-react";
import { useRecipeStore } from "@/store/recipe-store";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const RecipeCard = (props: RecipeCardType) => {
  const { toast } = useToast();
  const toggleLike = useRecipeStore((s) => s.toggleLike);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/recipe/${props._id}`);
  };
  const handleLike = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    recipeId: string
  ) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toast({
        title: "Uh oh! Not logged in..",
        description: "Do you wish to login?",
        action: (
          <ToastAction altText="Login" asChild>
            <Button onClick={() => router.push("/login")} size={"lg"} variant={"outline"}>
              Login
            </Button>
          </ToastAction>
        ),
      });
      return;
    }
    toggleLike(recipeId);
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
            <span
              onClick={(e) => handleLike(e, props._id)}
              className="text-sm grid grid-cols-2 text-center"
            >
              {props.isLiked ? <HeartIcon size={20} fill="red" color="red" /> : <HeartIcon size={20} />}
              {props.likesCount}
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
