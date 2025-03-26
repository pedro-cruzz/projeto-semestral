import styled from "styled-components";

export const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  h2 {
    margin: 0 0 1rem 0;
    color: #333;
    text-align: center;
  }
`;

export const InputContainer = styled.div<{ $hasError: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-weight: 500;
    color: #444;
    font-size: 0.9rem;
  }

  input {
    padding: 0.75rem;
    border: 1px solid ${({ $hasError }) => ($hasError ? "#ff4444" : "#ddd")};
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;

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
