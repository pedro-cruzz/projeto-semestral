// Carousel.tsx
import { useState } from "react";
import { CarouselProps } from "./types";
import {
  CarouselWrapper,
  CarouselContent,
  LeftArrow,
  RightArrow,
} from "./styles";

export function Carousel<T>({
  items,
  renderItem,
  itemsPerPage = 3,
}: CarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = items.length;

  // O índice máximo garante que sempre serão exibidos "itemsPerPage" elementos
  // Avança um item adiante; volta ao início quando chega no fim
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  // Volta um item; vai para o último quando está no primeiro
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  // Seleciona itemsPerPage elementos de forma circular
  const currentItems = Array.from({ length: itemsPerPage }).map((_, i) => {
    const idx = (currentIndex + i) % totalItems;
    return items[idx];
  });

  return (
    <CarouselWrapper>
      <LeftArrow onClick={handlePrev}>{"<"}</LeftArrow>
      <RightArrow onClick={handleNext}>{">"}</RightArrow>
      <CarouselContent style={{ padding: "20px 60px" }}>
        {currentItems.map((item, index) => (
          <div key={index}>
            {renderItem(item, (currentIndex + index) % totalItems)}
          </div>
        ))}
      </CarouselContent>
    </CarouselWrapper>
  );
}
