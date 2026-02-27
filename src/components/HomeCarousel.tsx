import {carouselItems} from "../constants/home";
import {Carousel, CarouselContent, CarouselItem} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function HomeCarousel() {
  return (
    <Carousel
      className="overflow-hidden w-full"
      plugins={[
        Autoplay({
          delay: 2000,
          loop: true,
        }),
      ]}>
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={item.img}
                className="rounded overflow-hidden object-cover w-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
