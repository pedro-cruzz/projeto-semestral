export interface ICardProfilePatientProps {
  name: string;
  birthDate: string;
  showActionButtons?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}
