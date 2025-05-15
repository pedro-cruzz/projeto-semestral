// src/pages/PatientProfile/components/EditProfileModal.tsx
import { useState, useEffect } from "react";
import { Modal, Snackbar, Alert } from "@mui/material";
import { Button } from "../../../../components/Button";
import { theme } from "../../../../styles/theme";
import { updatePatient } from "../../../../services/updatePatient";
import { PatientResponse } from "../../../../dtos/updatePatient";
import { InputFieldComponent } from "../../../../components/Forms/fields/InputField";
import {
  ContainerInputs,
  FieldGroup,
  Label,
  TextArea,
} from "../../../PsychologistProfile/components/ModalEdit/syles";

interface EditPatientModalProps {
  patient: PatientResponse;
  open: boolean;
  onClose: () => void;
  onUpdate: (updated: PatientResponse) => void;
}

export const EditPatientModal = ({
  patient,
  open,
  onClose,
  onUpdate,
}: EditPatientModalProps) => {
  const [formData, setFormData] = useState({
    name: patient.name,
    birthDate: patient.birthDate.split("T")[0], // YYYY-MM-DD
    email: "",
    image: patient.image || "",
    about: patient.about || "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSucessMessage, setSucessAlertMessage] = useState("");
  const [alertErrorMessage, setErrorAlertMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        name: patient.name,
        birthDate: patient.birthDate.split("T")[0],
        email: "",
        image: patient.image || "",
        about: patient.about || "",
      });
      // busca email
      (async () => {
        try {
          const res = await fetch(
            `http://localhost:3001/users/${patient.userId}`
          );
          const user = await res.json();
          setFormData((f) => ({ ...f, email: user.email }));
        } catch (err) {
          console.error("Erro ao buscar email:", err);
        }
      })();
    }
  }, [open, patient]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errs: any = {};
    if (!formData.name.trim()) errs.name = "Nome é obrigatório";
    if (formData.birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(formData.birthDate))
      errs.birthDate = "Use formato YYYY-MM-DD";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const result = await updatePatient(
        patient.id,
        {
          /* opcional: email: formData.email */
        },
        {
          name: formData.name,
          birthDate: formData.birthDate,
          image: formData.image,
          about: formData.about,
        }
      );
      onUpdate(result.patient);
      setSucessAlertMessage(`Paciente: ${patient.name} editado com sucesso!`);
      setAlertOpen(true);
      setTimeout(onClose, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setErrorAlertMessage("Erro ao editar.");
      setAlertOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAlertClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "400px",
          width: "800px",
        }}
      >
        <h2
          style={{
            color: theme.colors.DARK_GREEN,
            fontFamily: theme.fonts.mulish,
            textAlign: "start",
          }}
        >
          Editar Perfil
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            paddingBlock: "1rem",
          }}
        >
          <ContainerInputs>
            <InputFieldComponent
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <InputFieldComponent
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </ContainerInputs>

          <ContainerInputs>
            <InputFieldComponent
              label="Foto"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            <FieldGroup>
              <Label>Sobre</Label>
              <TextArea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Conte sobre sua experiência"
              />
            </FieldGroup>
          </ContainerInputs>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <Button
              type="button"
              $variant="primary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" $variant="secondary" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
        <Snackbar
          open={alertOpen}
          autoHideDuration={800}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          {alertSucessMessage ? (
            <Alert onClose={handleAlertClose} severity="success">
              {alertSucessMessage}
            </Alert>
          ) : (
            <Alert onClose={handleAlertClose} severity="error">
              {alertErrorMessage}
            </Alert>
          )}
        </Snackbar>
      </div>
    </Modal>
  );
};

export default EditPatientModal;
