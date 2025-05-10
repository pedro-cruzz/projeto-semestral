import { Button } from "../../../Button";
import { ModalActions, ModalContainer, ModalHeader, Overlay } from "./styles";

interface ConfirmLogoutModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmLogoutModal({
  open,
  onConfirm,
  onCancel,
}: ConfirmLogoutModalProps) {
  if (!open) return null;
  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>Tem certeza que deseja sair?</ModalHeader>
        <p>Você será deslogado do Mente Saudável.</p>
        <ModalActions>
          <Button $variant="primary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button $variant="secondary" onClick={onConfirm}>
            Confirmar
          </Button>
        </ModalActions>
      </ModalContainer>
    </Overlay>
  );
}
