"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import RecipeCard from "@/components/RecipeCard";
import RecipeService from "@/services/recipeService";
import { RecipeCardType } from "@/types/IRecipe";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const path = "/recipe?page=";

const RecipePage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const [recipes, setRecipies] = React.useState<RecipeCardType[]>([]);
  const [count, setCount] = React.useState(0);
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];

  const totalPages = React.useMemo(() => {
    return  Math.ceil(count / 9);
  }, [count]);
  
  // const totalPages = React.useMemo(() => {
  //   const pg = Math.ceil(count / 9);

  //   return recipes.length < pg ? recipes.length : pg;
  // }, [count]);

  const pageNumber = React.useMemo(() => {
    if (typeof +page === "number") {
      return +page;
    }
    return 0;
  }, [page]);

  const maxPageButtons = 3;

  let startPage = Math.max(1, pageNumber - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const data: any = await RecipeService.getRecipeCardList(page, search);
      if (data.isSuccess) {
        setRecipies(data.result.recipes);
        setCount(data.result.count);
      }
    };
    fetchData();
  }, [setRecipies, page, search?.length]);

  return (
    <div className="">
      <BreadCrumbs names={["Recipe"]} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {recipes.map((x) => (
          <RecipeCard {...x} key={x._id} />
        ))}
      </div>

      <div className="grid place-content-center my-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`${path}${pageNumber - 1}${search ? "&search=" + search : ""}`}
                disabled={pageNumber <= 1}
              />
            </PaginationItem>
            {pageNumbers.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`${path}${page}${search ? "&search=" + search : ""}`}
                  isActive={pageNumber === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`${path}${pageNumber + 1}${search ? "&search=" + search : ""}`}
                disabled={pageNumber >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default RecipePage;
