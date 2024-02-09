import React from "react";
import img from "@/assets/pranjall-kumar-sejqj6Eaqe8-unsplash.jpg";
import Image from "next/image";
import '@/components/home-sub-pages/home-page.css';
import Container from "@/components/Container";
import Page1 from "@/components/home-sub-pages/page1";

export default function Home() {
  return (
<>
<Container
      component="section"
      className="hero-banner"
    >
      <div className="hero-banner__title" aria-hidden={true}>
        Cook With What You Have
      </div>

      <div className="relative w-[400px] h-[400px]">
        <Image
          src={img}
          alt="hero section image"
          className="hero-banner__image"
          height={400}
          width={400}
        />
      </div>
      <h1 className="hero-banner__title hero-banner__stroked-title">
      Cook With What You Have
      </h1>
    </Container>
    <section className="content h-full w-full">
        <Page1/>
    </section>
</>
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
