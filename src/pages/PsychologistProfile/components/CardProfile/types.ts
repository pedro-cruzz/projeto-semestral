export interface ICardProfileProps {
  name: string;
  crp: string;
  about?: string;
  specialization?: string[];
  showEditButton?: boolean;
  onEditClick?: () => void;
}
