import "./styles.ts";
import { NotFoundContainer, ButtonBack } from "./styles";
import { BaseLayout } from "../../components/BaseLayout";
import { Link } from "react-router-dom";
import back from "./../../assets/png/back-button.png";

export default function NotFound() {
  return (
    <BaseLayout>
      <NotFoundContainer>
        <ButtonBack>
          <div></div>
          <Link to={"/"}>
            <img src={back} alt="back" width={"30px"} />
          </Link>
        </ButtonBack>
        <h1>404 - Not Found</h1>
        <p>Essa página não existe.</p>
      </NotFoundContainer>
    </BaseLayout>
  );
}
