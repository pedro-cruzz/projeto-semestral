import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 400px;
  width: 800px;
  flex: 1;
`;

export const ContainerInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  width: 100%;

  & > * {
    flex: 1;
    min-width: 200;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: ${theme.colors.DARK_GREEN};
  font-family: ${theme.fonts.mulish};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  font-family: ${theme.fonts.mulish};
  border: 1px solid ${theme.colors.GRAY};
  border-radius: 4px;
  overflow: auto;
  resize: none;
  outline: none;

  &:focus {
    border: 2px solid ${theme.colors.LIGHT_GREEN};
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 80px;
  overflow-y: auto;
  padding: 0.25rem;
  border: 1px solid ${theme.colors.GRAY};
  border-radius: 4px;
`;

export const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: ${theme.colors.LIGHT_GREEN};
  border-radius: 16px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
`;

export const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
`;

export const Actions = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const Placeholder = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.GRAY};
`;
