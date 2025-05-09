// components/EditProfileModal.tsx
import { useState, useEffect } from "react";

import { Modal } from "@mui/material";
import { PsychologistResponse } from "../../../../dtos/updatePsychologist";
import { updatePsychologist } from "../../../../services/updatePsychologist";
import { InputFieldComponent } from "../../../../components/Forms/fields/InputField";
import { Button } from "../../../../components/Button";

interface EditProfileModalProps {
  psychologist: PsychologistResponse;
  open: boolean;
  onClose: () => void;
  onUpdate: (updatedData: PsychologistResponse) => void;
}

export const EditProfileModal = ({
  psychologist,
  open,
  onClose,
  onUpdate,
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    name: psychologist.name,
    email: "",
    crp: psychologist.crp,
    about: psychologist.about || "",
    image: psychologist.image || "",
    specialization: psychologist.specialization?.join(", ") || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Buscar email do usuário ao abrir o modal
    const fetchUserEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${psychologist.userId}`
        );
        const user = await response.json();
        setFormData((prev) => ({ ...prev, email: user.email }));
      } catch (error) {
        console.error("Erro ao buscar email:", error);
      }
    };

    if (open) {
      fetchUserEmail();
    }
  }, [open, psychologist.userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.email) newErrors.email = "Email é obrigatório";
    if (!formData.crp) newErrors.crp = "CRP é obrigatório";
    if (formData.crp && !/^[A-Z]{2}\/\d{5}$/.test(formData.crp)) {
      newErrors.crp = "Formato inválido (ex: UF/12345)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const updatedData = await updatePsychologist(
        psychologist.id,
        { email: formData.email },
        {
          name: formData.name,
          crp: formData.crp,
          about: formData.about,
          image: formData.image,
          specialization: formData.specialization.split(", "),
        }
      );

      onUpdate(updatedData.psychologist);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro na atualização:", error);
      setErrors((prev) => ({ ...prev, form: error.message }));
    } finally {
      setIsSubmitting(false);
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
          minWidth: "400px",
        }}
      >
        <h2>Editar Perfil</h2>

        {errors.form && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputFieldComponent
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name}
          />

          <InputFieldComponent
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email}
            disabled
          />

          <InputFieldComponent
            label="CRP"
            name="crp"
            value={formData.crp}
            onChange={handleChange}
            error={errors.crp}
            helperText={errors.crp}
            disabled
          />

          <InputFieldComponent
            label="Imagem (URL)"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <InputFieldComponent
            label="Especializações"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            helperText="Separe por vírgulas"
          />

          <InputFieldComponent
            label="Sobre"
            name="about"
            value={formData.about}
            onChange={handleChange}
          />

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <Button type="button" $variant="primary" onClick={onClose}>
              Cancelar
            </Button>

            <Button type="submit" $variant="secondary" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
