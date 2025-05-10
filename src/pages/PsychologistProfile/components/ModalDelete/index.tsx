import { Modal, Typography, Box } from "@mui/material";
import { Button } from "../../../../components/Button";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "300px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Tem certeza que deseja deletar este psicólogo?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            mt: 2,
          }}
        >
          <Button $variant="primary" onClick={onClose}>
            Cancelar
          </Button>
          <Button $variant="secondary" onClick={handleConfirm}>
            Deletar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
