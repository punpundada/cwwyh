import { Options } from "@/components/form-control/ComboboxController";
import IngredientService from "@/services/ingredientService";
import React, { useEffect } from "react";

export const useIngredientList = () => {
  const [list, setList] = React.useState<Options[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resList = await IngredientService.getAllIngredient();
      const optionList =
        resList?.map((ingredient) => {
          return {
            value: ingredient.ingredientName,
            label: ingredient.ingredientName,
            id:ingredient._id.toString()
          };
        }) ?? [];
      setList(optionList);
    };
    fetchData();
  }, []);
  return {ingredienList:list,setList};
};
