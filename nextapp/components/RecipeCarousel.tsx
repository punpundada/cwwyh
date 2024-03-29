import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRecipeStore } from "@/store/recipe-store";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface RecipeCarouselProps{
  handleImageIndex: (index: number) => void
}

export function RecipeCarousel({handleImageIndex}:RecipeCarouselProps) {
  const recipe = useRecipeStore((s) => s.recipe);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      className="w-3/4 md:w-full max-w-md min-w-max"
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
    >
      <CarouselContent>
        {recipe?.imgUrls?.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className="pl-1 basis-[100%] md:basis-1/2 lg:basis-1/3"
              onClick={()=>handleImageIndex(index)}
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative ">
                    <Image
                      src={item?.imgUrl}
                      alt="Recipe Image"
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

/*
        {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">{index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
        ))}
*/
