// Header.styles.ts
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";

export const HeaderContainer = styled.header`
  width: 100%;
  padding-block: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Logo = styled.img`
  height: 40px;
`;

export const Nav = styled.nav``;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 30px;
  list-style: none;
`;

export const NavItemLink = styled(Link)`
  font-weight: 500;
  font-size: 1rem;
  color: ${theme.colors.DARK_GREEN};
  text-decoration: none;
  transition: color 0.3s;
  font-family: ${theme.fonts.mulish};
  &:hover {
    color: ${theme.colors.LIGHT_GREEN};
  }
`;

export const IconItem = styled.li`
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
