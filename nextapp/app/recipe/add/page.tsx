"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";
import ComboboxController from "@/components/form-control/ComboboxController";
import { InputController } from "@/components/form-control/InputController";
import RadioGroupController from "@/components/form-control/RadioGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import React from "react";
import {  useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeInsert, RecipeSchema } from "@/types/IRecipe";
import TextAreatController from "@/components/form-control/TextAreatController";
import {  MoveUp,  Trash2 } from "lucide-react";
import { useIngredientList } from "@/hooks/useIngredientList";
import { Button } from "@/components/ui/button";

const radioOptions = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "ADVANCE", label: "ADVANCE" },
];

const courseOptions = [
  { value: "BREAKFAST", label: "BREAKFAST" },
  { value: "DINNER", label: "DINNER" },
  { value: "LUNCH", label: "LUNCH" },
];

const options = [
  {
    value: "option 1",
    label: "option 1",
    id: "1",
  },
  {
    value: "option 2",
    label: "option 2",
    id: "2",
  },
  {
    value: "option 3",
    label: "option 3",
    id: "3",
  },
  {
    value: "value 3",
    label: "label 3",
    id: "4",
  },
];


const AddRecipePage = () => {

  const form = useForm<RecipeInsert>({
    resolver: zodResolver(RecipeSchema),
    mode: "onChange",
    defaultValues: {
      recipeName: "",
      description: "",
      course: "BREAKFAST",
      difficultyLevel: "EASY",
      servings: 1,
      cuisine: "",
      calories: "",
      cookingTime: "",
      prepTime: "",

      imgUrls: [],
      ingredientsList: [],
      steps: [],
    } as any,
  });

  const stepsForm = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const ingredientsForm = useFieldArray({
    control: form.control,
    name: "ingredientsList",
  });


  const filterIngredient = form.watch("filterIngredient");

  const { ingredienList, setList } = useIngredientList();

 const handleLastInput = React.useCallback((e: React.FormEvent<HTMLInputElement>, index: number)=> {
    if (stepsForm.fields.length - 1 !== index) return;
    if (e.currentTarget.value.trim().length <= 0) return;

    stepsForm.append(
      {
        step: "",
      },
      { shouldFocus: false }
    );
  },[stepsForm.fields.length,stepsForm.append])

  function handleFindValue(rowId: string) {
    return ingredienList.find((x) => x.id === rowId)?.label;
  }

  function onSumbit(data:RecipeInsert){
    console.log(data)
  }

  React.useEffect(() => {
    if (stepsForm.fields.length === 0) {
      stepsForm.append(
        {
          step: "",
        },
        { shouldFocus: true }
      );
    }
  }, [stepsForm.fields.length]);

  React.useEffect(() => {
    if (!filterIngredient) return;
    const ingredient = ingredienList.find(
      (x) => x.id.toString() === filterIngredient.toString()
    );
    if (!ingredient) return;

    ingredientsForm.append({
      ingredientId: ingredient.id,
      quantity: "",
    });
    setList(ingredienList.filter((x) => x.id !== ingredient.id));
    form.resetField("filterIngredient");
  }, [ingredientsForm.append, filterIngredient]);

  React.useEffect(()=>{
    console.log(form.formState.errors)
  },[form.formState])

  return (
    <>
      <BreadCrumbs names={["Recipe", "Add"]} />
      <Form {...form}>
        <Container
          className="flex-col w-[95%] md:w-[95%] gap-4 bg-background pb-4"
          component="form"
          onSubmit={form.handleSubmit(onSumbit)}
        >
          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>Step 1</CardTitle>
              <CardDescription>Basic Details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 ">
              <div className="col-span-1 md:col-span-2">
                <InputController
                  control={form.control}
                  name="recipeName"
                  placeholder="Recipe Name"
                  className="w-full"
                  label="Recipe Name"
                />
              </div>
              <InputController
                control={form.control}
                name="servings"
                placeholder="Servings"
                className="w-full"
                label="Servings"
              />
              <InputController
                control={form.control}
                name="calories"
                placeholder="Calories (Kcal)"
                className="w-full"
                label="Calories in kcal"
              />
              <ComboboxController
                name="cuisine"
                options={options}
                placeholder="Cuisine"
                label="Cuisine"
              />

              <InputController
                control={form.control}
                name="cookingTime"
                placeholder="Cooking Time"
                className="w-full"
                label="Cooking Time"
              />
              <RadioGroupController
                name="difficultyLevel"
                options={radioOptions}
                label="Difficulty Level"
              />
              <RadioGroupController
                name="course"
                options={courseOptions}
                label="Course"
              />
              <TextAreatController
                name="description"
                placeholder="Description"
                label="Description"
                className="w-full h-32"
              />
              <InputController
                control={form.control}
                name="prepTime"
                placeholder="Prep Time"
                className="w-full"
                label="Prep Time"
              />
            </CardContent>
          </Card>

          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>Step 2</CardTitle>
              <CardDescription>Ingredient Details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="col-span-1">
                {/* <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild ref={triggerRef}>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between h-[36px]"
                    >
                      {value
                        ? ingredienList.find((ing) =>
                            ing.id.toLowerCase().includes(label.toLowerCase())
                          )?.label
                        : `Select Ingredient`}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="min-w-[300px] p-0"
                    style={{ width: triggerRef?.current?.offsetWidth }}
                  >
                    <Command>
                      <CommandInput
                        placeholder={`Search Ingredient...`}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No Ingredient found.</CommandEmpty>
                        <CommandGroup>
                          {ingredienList
                            ?.filter(
                              (x) =>
                                !formIngredientList.find((y) => x.id === y.ingredientId)
                            )
                            .map((ingredientItem) => (
                              <CommandItem
                                key={ingredientItem.id}
                                value={ingredientItem.id}
                                onSelect={(currentValue) => {
                                  setValue(currentValue);
                                  ingredientsForm.append(
                                    {
                                      ingredientId: currentValue,
                                      quantity: "",
                                    },
                                    { shouldFocus: false }
                                  );
                                  setLabel(currentValue);
                                  setOpen(false);
                                }}
                              >
                                {ingredientItem.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value === ingredientItem.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover> */}
                <ComboboxController
                  name="filterIngredient"
                  options={ingredienList}
                  placeholder="Search for"
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
                {ingredientsForm.fields.map((row, index) => (
                  <div className="grid grid-cols-3" key={row.ingredientId}>
                    <div className="col-span-1">
                      <div className="flex gap-4">
                        {index + 1}.
                        <label htmlFor="" className="">
                          {handleFindValue(row.ingredientId)}
                        </label>
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-2  flex items-center justify-center">
                      <InputController
                        control={form.control}
                        name={`ingredientsList.${index}.quantity`}
                        placeholder="Quantity"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>Step 3</CardTitle>
              <CardDescription>Recipe Directions/Steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stepsForm.fields.map((row, index) => {
                return (
                  <div className="flex gap-4 w-full" key={row.id}>
                    <span className="w-[5%] text-center">{index + 1}.</span>
                    <div className="w-[70%]">
                      <InputController
                        control={form.control}
                        name={`steps.${index}.step`}
                        placeholder="Step"
                        onChange={(e) => handleLastInput(e, index)}
                      />
                    </div>
                    <div className="w-[20%] flex gap-2">
                      <Button
                        variant={"outline"}
                        className=""
                        disabled={index === 0}
                        onClick={() => stepsForm.move(index, index - 1)}
                        type="button"
                      >
                        <MoveUp strokeWidth={1} />
                      </Button>
                      <Button
                        variant={"outline"}
                        className=""
                        disabled={stepsForm.fields.length - 1 === index}
                        onClick={() => stepsForm.move(index, index + 1)}
                        type="button"
                      >
                        <MoveUp strokeWidth={1} className="rotate-180" />
                      </Button>
                      <Button
                        variant={"outline"}
                        className=""
                        onClick={() => stepsForm.remove(index)}
                        type="button"
                        disabled={stepsForm.fields.length <= 1}
                      >
                        <Trash2 strokeWidth={1} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Recipe</Button>
            </CardFooter>
          </Card>
        </Container>
      </Form>
    </>
  );
};

export default AddRecipePage;
