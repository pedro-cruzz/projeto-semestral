// components/EditProfileModal.tsx
import { useState, useEffect } from "react";

import { Alert, Modal, Snackbar } from "@mui/material";
import { PsychologistResponse } from "../../../../dtos/updatePsychologist";
import { updatePsychologist } from "../../../../services/updatePsychologist";
import { InputFieldComponent } from "../../../../components/Forms/fields/InputField";
import { Button } from "../../../../components/Button";
import {
  ContainerInputs,
  Title,
  FieldGroup,
  Label,
  RemoveBtn,
  TagChip,
  TagsContainer,
  TextArea,
  Placeholder,
} from "./syles";

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

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSucessMessage, setSucessAlertMessage] = useState("");
  const [alertErrorMessage, setErrorAlertMessage] = useState("");

  useEffect(() => {
    if (open) {
      setFormData({
        name: psychologist.name,
        email: "",
        crp: psychologist.crp,
        about: psychologist.about || "",
        image: psychologist.image || "",
        specialization: Array.isArray(psychologist.specialization)
          ? psychologist.specialization
              .filter((spec) => spec.trim() !== "")
              .join(", ")
          : "",
      });
      setTagInput("");
      // fetch email
      (async () => {
        try {
          const resp = await fetch(
            `http://localhost:3001/users/${psychologist.userId}`
          );
          const user = await resp.json();
          setFormData((prev) => ({ ...prev, email: user.email }));
        } catch (err) {
          console.error("Erro ao buscar email:", err);
        }
      })();
    }
  }, [open, psychologist]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag !== "" && !formData.specialization.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        specialization: [
          ...prev.specialization
            .split(", ")
            .filter((spec) => spec.trim() !== ""),
          tag,
        ].join(", "),
      }));
    }
    setTagInput("");
  };
  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization
        .split(", ")
        .filter((_, i) => i !== index)
        .join(", "),
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
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
      setSucessAlertMessage(
        `Psicólogo: ${updatedData.psychologist.name} editado com sucesso!`
      );
      setAlertOpen(true);
      setTimeout(onClose, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro na atualização:", error);
      setErrors((prev) => ({ ...prev, form: error.message }));
      setErrorAlertMessage("Erro ao editar.");
      setAlertOpen(true);
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
          width: "800px",
        }}
      >
        <Title>Editar Perfil</Title>

        {errors.form && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {errors.form}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <ContainerInputs>
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
          </ContainerInputs>
          <ContainerInputs>
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
          </ContainerInputs>
          <ContainerInputs>
            <FieldGroup>
              <Label>Especializações</Label>
              <TagsContainer>
                {formData.specialization.length > 0 ? (
                  formData.specialization.split(", ").map((spec, i) => (
                    <TagChip key={i}>
                      {spec}
                      <RemoveBtn
                        type="button"
                        onClick={() => handleRemoveTag(i)}
                      >
                        ×
                      </RemoveBtn>
                    </TagChip>
                  ))
                ) : (
                  <Placeholder>Adicione especializações</Placeholder>
                )}
              </TagsContainer>
              <InputFieldComponent
                label="Adicionar"
                name="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                helperText="Pressione Enter para adicionar"
              />
            </FieldGroup>

            {/* Campo About como textarea */}
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
