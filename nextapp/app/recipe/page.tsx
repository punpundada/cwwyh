"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { useRecipeStore } from "@/store/recipe-store";
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useAuthStore } from "@/store/auth-store";
const RecipePage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const getRecipeCardList = useRecipeStore((s) => s.getRecipeCardList);
  const isLoggedIn = useAuthStore(s=>s.isLoggedIn);
  const recipeCardList = useRecipeStore((s) => s.recipeCardList);
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];

  const handleAddNewRecipe = ()=>{
    if(!isLoggedIn){
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
      return
    }
    router.push("recipe/add")
  }

  React.useEffect(() => {
    const fetchData = async () => {
      getRecipeCardList(page, search);
    };
    fetchData();
  }, [page, search?.length]);

  return (
    <div className="">
      <BreadCrumbs names={["Recipe"]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {recipeCardList.map((x) => (
          <RecipeCard {...x} key={x._id} />
        ))}
      </div>
      <div className="fixed bottom-6 right-6">
        <Button variant={'ghost'} onClick={handleAddNewRecipe}>
          <span className="mr-1">Add</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-circle-plus"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default RecipePage;
