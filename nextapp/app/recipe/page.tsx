import Container from "@/components/Container";
import RecipeCard from "@/components/RecipeCard";
import SearchRecipe from "@/components/SearchRecipe";
import {getAllRecipeService} from "@/services/recipeService";

const RecipePage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const page = searchParams["page"] ?? 0;
  const search = searchParams["search"];
  const data = await getAllRecipeService(page, search);
  if (!data) return <>Something went wrong</>;
  return (
    <Container className="flex-col-reverse gap-2 md:flex-row h-full relative">
      <Container className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 sticky p-8">
        {data.data.recipes.map((x) => (
            <RecipeCard {...x} key={x._id}  />
        ))}
      </Container>
      <Container className="w-1/4 h-min md:h-full mt-[10rem] md:mt-0 static md:p-8">
        <SearchRecipe/>
      </Container>
    </Container>
  );
};

export default RecipePage;
