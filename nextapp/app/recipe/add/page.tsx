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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeInsert, RecipeSchema } from "@/types/IRecipe";
import TextAreatController from "@/components/form-control/TextAreatController";

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
    id: "1",
    value: "option 1",
    label: "option 1",
  },
  {
    id: "2",
    value: "option 2",
    label: "option 2",
  },
  {
    id: "3",
    value: "option 3",
    label: "option 3",
  },
];
//
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
    },
  });
  const dd = form.watch("cuisine");
  useEffect(() => {
    console.log(dd);
  }, [dd]);
  return (
    <>
      <BreadCrumbs names={["Recipe", "Add"]} />
      <Form {...form}>
        <Container
          className="flex-col w-[95%] md:w-[95%] gap-4 bg-background"
          component="form"
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Step 1</CardTitle>
              <CardDescription>Basic Details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                placeholder="Calories"
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
          <Card className="w-full">2</Card>
          <Card className="w-full">3</Card>
        </Container>
      </Form>
    </>
  );
};

export default AddRecipePage;
