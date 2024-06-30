"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";
import ComboboxController from "@/components/form-control/ComboboxController";
import { InputController } from "@/components/form-control/InputController";
import RadioGroupController from "@/components/form-control/RadioGroup";
import {
  Card,
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
  { value: "DINNERT", label: "DINNERT" },
  { value: "LUNCH", label: "DINNERT" },
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
          className="flex-col w-[95%] md:w-[70%] gap-4"
          component="form"
        >
          <Card className="w-full p-3">
            <CardHeader>
              <CardTitle>Recipe</CardTitle>
              <CardDescription>Basic Details</CardDescription>
            </CardHeader>
            <InputController
              control={form.control}
              name="recipeName"
              placeholder="Recipe Name"
              className="w-full"
              label="Recipe Name"
            />
            <div className="flex-col md:flex-row flex w-full pt-2 space-x-4 pb-4">
              <div className="pb-3 md:pb-0 w-full md:w-1/2">
                <TextAreatController
                  name="description"
                  placeholder="Description"
                  label="Description"
                  className="w-full h-40"
                />
              </div>
              <div className="flex justify-evenly items-center w-full md:w-1/2">
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
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-x-4">
              <div className="w-full md:w-1/2">
                <InputController
                  control={form.control}
                  name="servings"
                  placeholder="Servings"
                  className="w-full"
                  label="Servings"
                />
                <ComboboxController
                  name="cuisine"
                  options={options}
                  placeholder="Cuisine"
                  label="Cuisine"
                />
                <ComboboxController
                  name="cuisine"
                  options={options}
                  placeholder="Cuisine"
                  label="Cuisine"
                />
              </div>
              <div className="w-full md:w-1/2">
                <InputController
                  control={form.control}
                  name="servings"
                  placeholder="Servings"
                  className="w-full"
                  label="Servings"
                />
                <InputController
                  control={form.control}
                  name="servings"
                  placeholder="Servings"
                  className="w-full"
                  label="Servings"
                />
              </div>
            </div>
          </Card>
          <Card className="w-full">2</Card>
          <Card className="w-full">3</Card>
        </Container>
      </Form>
    </>
  );
};

export default AddRecipePage;
/*
            <CardHeader>
              <CardTitle>Recipe</CardTitle>
              <CardDescription>Basic Details</CardDescription>
            </CardHeader>
            <div className="flex-col md:flex-row flex w-full justify-evenly p-2 space-x-3">
              <div className="w-full md:w-1/2 flex flex-col space-y-4">
                <InputController
                  control={form.control}
                  name="recipeName"
                  placeholder="Recipe Name"
                  className="w-full"
                  label="Recipe Name"
                />
                <InputController
                  control={form.control}
                  name="servings"
                  placeholder="Servings"
                  className="w-full"
                  label="Servings"
                />
                <ComboboxController
                  name="cuisine"
                  options={options}
                  placeholder="Cuisine"
                  label="Cuisine"
                />
              </div>
              <div className="w-1/2 flex flex-col justify-evenly items-center">
                <div className="w-full flex justify-center items-center space-x-6">
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
                </div>
                <div className="w-full">
                  <InputController
                    control={form.control}
                    name="servings"
                    placeholder="Servings"
                    className="w-full"
                    label="Servings"
                  />
                  <InputController
                    control={form.control}
                    name="servings"
                    placeholder="Servings"
                    className="w-full"
                    label="Servings"
                  />
                </div>
              </div>
            </div>
*/
