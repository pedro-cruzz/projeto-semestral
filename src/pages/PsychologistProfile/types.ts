import { ICardProfileProps } from "./components/CardProfile/types";

export interface IPsychologistProfileProps extends ICardProfileProps {
  image?: string;
  imageArticle?: string;
  title: string;
  subtitle: string;
  psychologistId: string;
}
