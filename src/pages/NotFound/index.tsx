import "./styles.ts";
import { NotFoundContainer } from "./styles";
import { BaseLayout }   from "../../components/BaseLayout";

export default function NotFound() {
  return (
    <BaseLayout>
      <NotFoundContainer>
        <h1>404 - Not Found</h1>
        <p>Essa página não existe.</p>
      </NotFoundContainer>
    </BaseLayout>
  );
}
