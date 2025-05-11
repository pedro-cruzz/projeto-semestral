import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardContainer = styled.div`
  width: 280px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

export const About = styled.p`
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

export const Button = styled(Link)`
  display: block;
  text-align: center;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.DARK_GREEN};
  color: #fff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme.colors.LIGHT_GREEN};
  }
`;
