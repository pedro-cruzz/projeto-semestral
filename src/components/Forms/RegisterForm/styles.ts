import styled from "styled-components";

export const ContainerInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;

  & > * {
    flex: 1;
    min-width: 200;
  }
`;
