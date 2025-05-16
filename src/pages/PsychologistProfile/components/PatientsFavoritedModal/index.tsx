import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { PatientResponse } from "../../../../dtos/registerPatient";
import { getFavoritesByPsychologist } from "../../../../services/favoriteApi";
import { theme } from "../../../../styles/theme";

interface PatientsFavoritedModalProps {
  open: boolean;
  onClose: () => void;
  psychologistId: string;
}

export const PatientsFavoritedModal: React.FC<PatientsFavoritedModalProps> = ({
  open,
  onClose,
  psychologistId,
}) => {
  const [patients, setPatients] = useState<PatientResponse[]>([]);

  useEffect(() => {
    if (!open) return;
    getFavoritesByPsychologist(psychologistId)
      .then((list) => {
        setPatients(list.map((fav) => fav.patient!));
      })
      .catch(console.error);
  }, [open, psychologistId]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 460,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          mb={2}
          sx={{
            fontWeight: "bold",
            fontFamily: theme.fonts.mulish,
            color: theme.colors.DARK_GREEN,
          }}
        >
          Pacientes que me favoritaram 💚
        </Typography>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: 1,
          }}
        >
          <List disablePadding>
            {patients.map((p) => (
              <ListItem key={p.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/patient-profile/${p.id}`}
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.colors.LIGHT_GREEN,
                      borderRadius: "8px",
                      color: theme.colors.PURE_WHITE,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={p.image || undefined}>{p.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={p.name} />
                </ListItemButton>
              </ListItem>
            ))}
            {patients.length === 0 && (
              <Typography variant="body2" color="textSecondary" sx={{ p: 1 }}>
                Nenhum paciente ainda
              </Typography>
            )}
          </List>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientsFavoritedModal;
