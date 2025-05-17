export interface ICardProfileProps {
  name: string;
  crp: string;
  psychologistId: string;
  about?: string;
  specialization?: string[];
  favoriteCount?: number;
  showActionButtons?: boolean;
  isOwnProfile?: boolean;
  linkedin?: string;
  email?: string;
  whatsapp?: string;
  country?: string;
  uf?: string;
  cep?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string | number;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
