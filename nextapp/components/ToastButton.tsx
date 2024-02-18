"use client";
import React from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const ToastButton = () => {
  const { toast } = useToast();
  const click = () => {
    toast({ title: "hello world", description: "saying hello",className:'bg-accent'});
  };
  return (
    <div>
      <Button
        className="bg-border hover:bg-accent"
        onClick={click}
      >
        click me
      </Button>
    </div>
  );
};

export default ToastButton;
