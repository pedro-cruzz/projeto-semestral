import { useState } from "react";
import { Button } from "../Button";
import { UserData, UserFormProps } from "./types";
import { FormContainer } from "./styles";

export function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Cadastro de Usuário</h2>

      <label htmlFor="name">Nome</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="phone">Telefone</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Button variant="secondary" type="submit">
        Cadastrar
      </Button>
    </FormContainer>
  );
}
