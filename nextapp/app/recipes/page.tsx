// 'use client'
import Container from "@/components/Container";
import RecipeCard from "@/components/RecipeCard";
import getAllRecipeService from "@/services/recipeService";

const RecipePage =   async({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  // const getRecipes = useRecipeStore(s=>s.getRecipes);
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];
  const data = await getAllRecipeService(page,search);
  // console.log(data)
  if(!data) return <>Something went wrong</>
  return (
    <Container className="flex-col-reverse gap-4 md:flex-row relative">
      <Container className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-col-3 gap-4 sticky p-8">
        {
          data.data.recipes.map(x=>(
            <RecipeCard {...x} key={x._id} />
            ))
          }
      </Container>
      <Container className="w-1/4 h-min md:h-full">search filed</Container>
    </Container>
  );
};

export default RecipePage;
