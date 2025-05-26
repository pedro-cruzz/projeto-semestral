// Carousel.tsx
import { useState } from "react";
import { CarouselProps } from "./types";
import {
  CarouselWrapper,
  CarouselContent,
  LeftArrow,
  RightArrow,
  ItemWrapper,
} from "./styles";

export function Carousel<T>({
  items,
  renderItem,
  itemsPerPage = 3,
}: CarouselProps<T>) {
  const totalItems = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Se não há itens suficientes, renderiza fixo
  if (totalItems <= itemsPerPage) {
    return (
      <CarouselWrapper>
        <CarouselContent style={{ padding: "20px 60px" }}>
          {items.map((item, idx) => (
            <ItemWrapper key={idx}>{renderItem(item, idx)}</ItemWrapper>
          ))}
        </CarouselContent>
      </CarouselWrapper>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const currentItems = Array.from({ length: itemsPerPage }).map((_, i) => {
    const idx = (currentIndex + i) % totalItems;
    return items[idx];
  });

  return (
    <CarouselWrapper>
      <LeftArrow onClick={handlePrev}>{"<"}</LeftArrow>
      <RightArrow onClick={handleNext}>{">"}</RightArrow>
      <CarouselContent style={{ padding: "20px 60px" }}>
        {currentItems.map((item, index) => {
          const realIndex = (currentIndex + index) % totalItems;
          return (
            <ItemWrapper key={realIndex}>
              {renderItem(item, realIndex)}
            </ItemWrapper>
          );
        })}
      </CarouselContent>
    </CarouselWrapper>
  );
}
