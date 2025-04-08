import styled from "styled-components";
import { theme } from "../../styles/theme";

export const TitleForm = styled.h1`
    font-size: 2rem;
    display: flex;
    font-weight: 700;
    color: ${theme.colors.DARK_GREEN};
    text-align: center;
    justify-content: center;
    margin: 4rem auto;
    font-family: ${theme.fonts.boska};
    width: 100%;
    max-width: 850px;
`;

export const TextForm = styled.p`
    display: flex;
    font-size: 24px;
    font-weight: 400;
    color: ${theme.colors.DARK_GREEN};
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 4rem auto;
    width: 100%;
    max-width: 882px;
    font-family: ${theme.fonts.switzer};
`;  