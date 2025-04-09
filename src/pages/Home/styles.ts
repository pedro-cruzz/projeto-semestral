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



export const ChatAlert = styled.div`
    background-color: ${theme.colors.DARK_GREEN};
    color: ${theme.colors.WHITE};
    height: 450px;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 2rem;
`;

export const TitleChat = styled.h1`
    font-size: 40px;
    font-weight: 700;
    color: ${theme.colors.WHITE};
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 2rem auto;
    width: 100%;
    max-width: 882px;
    font-family: ${theme.fonts.boska};
`;

export const TextChat = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: ${theme.colors.WHITE};
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 1rem auto;
    width: 100%;
    max-width: 800px;
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
  margin-bottom: 2rem;
  margin-top: 10rem;
  align-items: center;
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

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 26px;
`;

export const ContainerBanner1 = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 10px;
  padding: 2rem;
  align-items: left;
  justify-content: center;
  margin-left: 200px;
  margin-top: 250px;
  color: ${theme.colors.WHITE};
`;

export const TitleBanner1 = styled.h1`
  font-size: 40px;
  font-weight: 700;
  font-family: ${theme.fonts.boska};
  margin-bottom: 1rem;
  text-align: left;
  justify-content: left;
  width: 100%;
  max-width: 455px;
`;

export const TextBanner1 = styled.p`
  font-size: 20px;
  font-weight: 400;
  font-family: ${theme.fonts.switzer};
  text-align: left;
  justify-content: left;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 380px;
`;