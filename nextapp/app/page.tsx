import Container from "@/components/Container";
import ToastButton from "@/components/ToastButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between bg-background h-full">
      <ToastButton/>  
    </div>
  );
}



/*
      <div className="w-full flex justify-center items-center text-text">

        <Container className="w-1/3 flex-col gap-8">
          <Button className="bg-background">background</Button>
          <Button className="bg-foreground">foreground</Button>
          <Button className="bg-card">card</Button>
          <Button className="bg-card-foreground">card-foreground</Button>
          <Button className="bg-popover">popover</Button>
        </Container>

        <Container className="w-1/3 flex-col gap-8">
          <Button className="bg-popover-foreground">popover-foreground</Button>
          <Button className="bg-primary">primary</Button>
          <Button className="bg-primary-foreground">primary-foreground</Button>
          <Button className="bg-secondary">secondary</Button>
          <Button className="bg-secondary-foreground">secondary-foreground</Button>
        </Container>

        <Container className="w-1/3 flex-col gap-8">
          <Button className="bg-muted">muted</Button>
          <Button className="bg-muted-foreground">muted-foreground</Button>
          <Button className="bg-accent">accent</Button>
          <Button className="bg-accent-foreground">accent-foreground</Button>
          <Button className="bg-destructive">destructive</Button>
        </Container>

        <Container className="w-1/3 flex-col gap-8">
          <Button className="bg-destructive-foreground">destructive-foreground</Button>
          <Button className="bg-border">border</Button>
          <Button className="bg-input">input</Button>
          <Button className="bg-ring">ring</Button>
          </Container>

          </div>
*/
