"use client";
import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";
import { InputController } from "@/components/form-control/InputController";
import RadioGroupController from "@/components/form-control/RadioGroup";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";

const AddRecipePage = () => {
  const form = useForm()
  return (
    <>
      <BreadCrumbs names={["Recipe", "Add"]} />
      <Form {...form}>
        <Container className="flex-col" component="form">
          <div className="w-[95%] md:w-4/5">
            <Card className="p-4">
              <div className=""><InputController control={form.control} name="recipeName" placeholder="Recipe Name" /></div>
              <div>
                <RadioGroupController control={form.control} name="difficultyLevel" options={[{label:"HELLO",value:"hello"},{label:"World",value:"world"}]} row label="HWLLO WORLD" />
              </div>
            </Card>
          </div>
          <div>card2</div>
          <div>card3s</div>
        </Container>
      </Form>
    </>
  );
};

export default AddRecipePage;
