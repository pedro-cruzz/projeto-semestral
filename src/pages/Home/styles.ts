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

export const TitleBanner6 = styled.h1`
    display: flex;
    max-width: 530px;
    width: 100%;
    position: absolute;
    margin-left: 800px;
    color: ${theme.colors.WHITE};
    font-size: 40px;
    font-weight: 700;
    font-family: ${theme.fonts.boska};
    margin-botom: 2rem;
    margin-top: 10rem;
    algin-items: center;
    text-justify: left;
`; 

export const TextBanner6 = styled.p`
    display: flex;
    max-width: 500px;
    width: 100%;
    position: absolute;
    margin-left: 800px;
    margin-top: 15rem;
    font-size: 20px;
    font-weight: 400;
    font-family: ${theme.fonts.switzer};
    justify-content: center;
    align-items: center;
    text-align: left;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 15px;
    color: ${theme.colors.WHITE};
`;

