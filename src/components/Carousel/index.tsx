// index.tsx
import React, { useState } from "react";
import {
  CarouselWrapper,
  CarouselContent,
  CarouselItem,
  ArrowButton,
  CarouselContainer,
} from "./styles";
import { CarouselProps } from "./types";

const TRANSITION_DURATION = 0.5; // segundos

// Função auxiliar para quebrar o array em chunks
const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

interface CarouselChunkProps {
  items: React.ReactNode[];
  itemsPerView: number;
}

const CarouselChunk: React.FC<CarouselChunkProps> = ({
  items,
  itemsPerView,
}) => {
  const totalItems = items.length;
  const maxIndex = totalItems - itemsPerView;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  // A lógica abaixo calcula a porcentagem de translação baseada no índice atual.
  const translateX = -(currentIndex * (100 / totalItems));

  return (
    <CarouselWrapper>
      <ArrowButton onClick={handlePrev} position="left">
        &#9664;
      </ArrowButton>
      <ArrowButton onClick={handleNext} position="right">
        &#9654;
      </ArrowButton>
      <CarouselContent translateX={translateX} transition={TRANSITION_DURATION}>
        {items.map((item, idx) => (
          <CarouselItem key={idx} itemsPerView={itemsPerView}>
            {item}
          </CarouselItem>
        ))}
      </CarouselContent>
    </CarouselWrapper>
  );
};

const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsPerView = 3,
  maxCarouselItems = 15,
  gapBetweenCarousels = 20,
}) => {
  // Divide a lista de itens em grupos caso ultrapasse o limite de itens por carousel
  const chunks = chunkArray(items, maxCarouselItems);

  return (
    <>
      {chunks.map((chunk, idx) => (
        <CarouselContainer key={idx} gap={gapBetweenCarousels}>
          <CarouselChunk items={chunk} itemsPerView={itemsPerView} />
        </CarouselContainer>
      ))}
    </>
  );
};

export default Carousel;
