import styled from "styled-components";
import { theme } from "../../styles/theme";

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
`;

export const CarouselContent = styled.div`
  display: flex;
  gap: 16px;
  transition: transform 0.3s ease-in-out;
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${theme.colors.DARK_GREEN};
  color: ${theme.colors.WHITE};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1;
  opacity: 0.8;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

export const RightArrow = styled(ArrowButton)`
  right: 10px;
`;
