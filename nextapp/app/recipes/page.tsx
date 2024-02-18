// 'use client'
import Container from "@/components/Container";
import getAllRecipeService from "@/services/recipeService";

const RecipePage =  ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  // const getRecipes = useRecipeStore(s=>s.getRecipes);
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];
   getAllRecipeService(page,search);

  return (
    <Container className="flex-col-reverse gap-4 md:flex-row relative">
      <Container className="w-3/4 sticky">cards</Container>
      <Container className="w-1/4 h-min md:h-full">search filed</Container>
    </Container>
  );
};

export default RecipePage;
