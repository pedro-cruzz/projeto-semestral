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
  justify-content: center; /* centraliza os cards */
  align-items: center;
  gap: 16px;
  transition: transform 0.3s ease-in-out;

  /* ocupa toda a área entre as setas */
  width: 100%; /* ocupa todo o espaço interno do wrapper */
  padding: 0 60px; /* mantém o espaçamento interno para as setas */
  box-sizing: border-box;
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
