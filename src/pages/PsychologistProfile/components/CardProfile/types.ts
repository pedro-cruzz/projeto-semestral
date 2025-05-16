export interface ICardProfileProps {
  name: string;
  crp: string;
  psychologistId: string;
  about?: string;
  specialization?: string[];
  favoriteCount?: number;
  showActionButtons?: boolean;
  isOwnProfile?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
