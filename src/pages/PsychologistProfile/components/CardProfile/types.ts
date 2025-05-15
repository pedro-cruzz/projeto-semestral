export interface ICardProfileProps {
  name: string;
  crp: string;
  psychologistId: string;
  about?: string;
  specialization?: string[];
  favoriteCount?: number;
  showActionButtons?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}
