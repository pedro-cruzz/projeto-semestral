// src/pages/PatientProfile/components/EditProfileModal.tsx
import { useState, useEffect } from "react";
import { Modal, Snackbar, Alert } from "@mui/material";
import { Button } from "../../../../components/Button";
import { theme } from "../../../../styles/theme";
import { updatePatient } from "../../../../services/updatePatient";
import { PatientResponse } from "../../../../dtos/updatePatient";
import { InputFieldComponent } from "../../../../components/Forms/fields/InputField";

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
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        name: patient.name,
        birthDate: patient.birthDate.split("T")[0],
        email: "",
      });
      // busca email
      (async () => {
        try {
          const res = await fetch(
            `http://localhost:3001/users/${patient.userId}`
          );
          const user = await res.json();
          setFormData((f) => ({ ...f, email: user.email }));
        } catch {
          // ignore
        }
      })();
      setErrors({});
      setAlert(null);
    }
  }, [open, patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        }
      );
      onUpdate(result.patient);
      setAlert({ type: "success", msg: "Perfil atualizado com sucesso!" });
      setTimeout(onClose, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setAlert({ type: "error", msg: err.message || "Erro ao atualizar" });
    } finally {
      setSubmitting(false);
    }
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
          minWidth: "360px",
          width: "400px",
        }}
      >
        <h2 style={{ color: theme.colors.DARK_GREEN }}>Editar Perfil</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <InputFieldComponent
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <InputFieldComponent
            label="Data de nascimento"
            name="birthDate"
            placeholder="YYYY-MM-DD"
            value={formData.birthDate}
            onChange={handleChange}
            error={errors.birthDate}
          />
          <InputFieldComponent
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
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
        {!!alert && (
          <Snackbar
            open
            autoHideDuration={3000}
            onClose={() => setAlert(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert severity={alert.type}>{alert.msg}</Alert>
          </Snackbar>
        )}
      </div>
    </Modal>
  );
};

export default EditPatientModal;
