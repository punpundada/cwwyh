"use client";
import Container from "@/components/Container";
import { useRecipeStore } from "@/store/recipe-store";
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";


const RecipePage = ({ params }: { params: { id: string } }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<1 | 2>(1);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const getRecipeById = useRecipeStore((s) => s.getRecipeById);
  const recipe = useRecipeStore((s) => s.recipe);
  const handleImageIndex = (index: number) => {
    setImageIndex(index);
  };

  const handleScrollDown = () => {
    if (scrollAreaRef.current) {
      console.log("inside if");
      scrollAreaRef.current.scrollBy({ top: -100, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    const fethData = async () => {
      await getRecipeById(params.id);
    };
    fethData();
  }, [getRecipeById, params.id]);
  if (!recipe) {
    return <>something went wrong</>;
  }
  
  return (
    <div className="h-screen w-full">
      <BreadCrumbs names={["Recipe","id"]} />
      <Container className="relative h-2/5 w-full md:w-3/5">
        <Image
          src={recipe?.imgUrls[0].imgUrl}
          alt={recipe.recipeName?? ''}
          fill
          className="object-cover rounded-t-xl"
        />
      </Container>
      <Container className="p-4 flex-col h-auto justify-start items-start md:w-3/5 border gap-4">
        <p className="text-3xl font-bold">{recipe?.recipeName}</p>
        <span className="italic py-3">Recipe by {recipe?.user.userName}</span>
          <Separator/>
        <Container className="h-auto justify-between items-start text-sm md:px-36">
          
        </Container>
      </Container> 
    </div>
  );
};

export default RecipePage;