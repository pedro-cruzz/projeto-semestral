export interface ICardProfileProps {
  name: string;
  crp: string;
  about?: string;
  specialization?: string[];
  showActionButtons?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}
