import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Container = styled.div`
  background-color: ${theme.colors.PURE_WHITE};
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 288px;
  gap: 30px;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 288px;
  height: 233px;
  border-radius: 30px;
`;

export const ContentText = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-family: ${theme.fonts.mulish};
  color: ${theme.colors.DARK_GREEN};
  font-size: 20px;
  font-weight: bold;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0 1rem;
  line-height: 1.3;

  /* === aqui começa o “magic” para truncar e manter altura fixa === */
  display: -webkit-box; /* ativa o flex box em WebKit */
  -webkit-box-orient: vertical; /* orienta em colunas */
  -webkit-line-clamp: 4; /* número máximo de linhas */
  overflow: hidden; /* esconde o excesso */
  text-overflow: ellipsis; /* adiciona “…” no corte */

  /* opcional: definir altura exata para reforçar mesmo tamanho */
  height: calc(1.3em * 4); /* line-height (1.3) x 3 linhas */
`;
