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

  // O índice máximo garante que sempre serão exibidos "itemsPerPage" elementos
  const maxIndex = Math.max(0, items.length - itemsPerPage);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <CarouselWrapper>
      <LeftArrow onClick={handlePrev} disabled={currentIndex === 0}>
        {"<"}
      </LeftArrow>
      <RightArrow onClick={handleNext} disabled={currentIndex >= maxIndex}>
        {">"}
      </RightArrow>
      <CarouselContent style={{ padding: "0 60px" }}>
        {currentItems.map((item, index) => (
          <div
            key={index}
            style={{ flex: `0 0 calc(100% / ${itemsPerPage} - 16px)` }}
          >
            {renderItem(item, currentIndex + index)}
          </div>
        ))}
      </CarouselContent>
    </CarouselWrapper>
  );
}
