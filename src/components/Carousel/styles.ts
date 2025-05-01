// styles.ts
import styled from "styled-components";

export const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

export const CarouselContent = styled.div<{
  translateX: number;
  transition: number;
}>`
  display: flex;
  transform: ${({ translateX }) => `translateX(${translateX}%)`};
  transition: transform ${({ transition }) => transition}s ease;
`;

export const CarouselItem = styled.div<{ itemsPerView: number }>`
  flex: 0 0 ${({ itemsPerView }) => 100 / itemsPerView}%;
  box-sizing: border-box;
  padding: 10px;
`;

export const ArrowButton = styled.button<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ position }) => (position === "left" ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

// Container para cada carousel (quando houver mais de um)
export const CarouselContainer = styled.div<{ gap: number }>`
  margin-bottom: ${({ gap }) => gap}px;
  &:last-child {
    margin-bottom: 0;
  }
`;
