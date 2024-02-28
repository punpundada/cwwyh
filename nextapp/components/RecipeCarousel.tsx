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
export function RecipeCarousel() {
  const recipe = useRecipeStore((s) => s.recipe);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnMouseEnter: true })
  );
  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
    >
      <CarouselContent>
        {recipe?.imgUrls?.map((item, index) => {
          return (
            <CarouselItem key={index} className="">
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
