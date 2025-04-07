import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FormContainer = styled.form`
  width: 100%;
  max-width: 800px;
  background: #ffffff;
  padding: 40px;
  height437px;
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 25px 5px rgba(0, 0, 0, 0.35);
  margin: 0 auto;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  
  

  h2 {
    margin: 0 0 1rem 0;
    color: var();
    text-align: center;
    margin-bottom: 30px;
    font-size: 26px
    font-weight: 700;
    font-family: ${theme.fonts.boska};
    color: ${theme.colors.DARK_GREEN};
  }
`;

export const InputContainer = styled.div<{ $hasError: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border: none;

  label {
    font-weight: 500;
    color: #444;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    transition: color 0.2s;
    width: 700px;
  }

  input {
    padding: 0.75rem;
    border: 1px solid ${({ $hasError }) => ($hasError ? "#ff4444" : "#ddd")};
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
    border-bottom: 2px solid rgba(0, 0, 0, 0.28);
    border-left: transparent;
    border-right: transparent;
    border-top: transparent;
    width: 700px;

    &:focus {
      outline: none;
      border-color: ${({ $hasError }) => ($hasError ? "#ff4444" : "#0099ff")};
      box-shadow: 0 0 0 2px
        ${({ $hasError }) =>
          $hasError ? "rgba(255, 68, 68, 0.2)" : "rgba(0, 153, 255, 0.2)"};
    }

    &:disabled {
      background-color: #f5f5f5;
    }
  }

  .error-message {
    color: #ff4444;
    font-size: 0.8rem;
    margin: 0;
  }

`;
