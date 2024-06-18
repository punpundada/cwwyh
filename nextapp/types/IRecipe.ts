export type User={
  userId:string,
  userName:string
}
export interface IRecipe {
    _id: string;
    recipeName: string;
    user:User ;
    ingredientsList: IngredientsList[];
    prepTime: string;
    description:string;
    difficultyLevel: string;
    imgUrls: ImgUrl[];
    steps:IStep[]
  }
  interface IStep {
    step: string;
  }
  
  interface IngredientsList {
    ingredientId: string;
    quantity: string;
    _id: string;
  }
  
  interface ImgUrl {
    imgUrl: string;
    _id: string;
  }