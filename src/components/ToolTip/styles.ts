import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ToolTipContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 1.5rem;
  background-color: ${theme.colors.LIGHT_GREEN};
  color: ${theme.colors.WHITE};
  font-size: 16px;
`;

export const ToolTipText = styled.p`
  margin: 0;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  font-family: ${theme.fonts.switzer};
  font-size: 20px;

  &:hover {
    opacity: 0.8;
  }
`;