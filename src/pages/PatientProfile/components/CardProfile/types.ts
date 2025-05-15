export interface ICardProfilePatientProps {
  name: string;
  birthDate: string;
  about?: string;
  showActionButtons?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}
