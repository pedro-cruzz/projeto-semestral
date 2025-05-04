import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background-color: #fff;
  color: ${theme.colors.DARK_GREEN};
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 16px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Só pra alinharmos a seta, caso use um ícone simples de CSS ou um SVG  */
  min-width: 200px;
`;

export const Arrow = styled.span<{ isOpen: boolean }>`
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  /* Se quiser usar um "triângulo" como seta */
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #333;
`;

export const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;

  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;

  /* Só mostrar se isOpen for true */
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  width: 100%;
  margin: 0;
  padding: 0.5rem 0;
  list-style: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

export const DropdownItemLi = styled.li`
  padding: 0.5rem 1rem;
  cursor: auto;
  color: ${theme.colors.DARK_GREEN};

  &:hover {
    font-weight: 700;
  }
`;
