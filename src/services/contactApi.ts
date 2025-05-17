// services/contactApi.ts
import api from "./api";
import {
  ContactResponse,
  CreateContactDTO,
  UpdateContactDTO,
} from "../dtos/contact";

/** Cria nova entrada de contato */
export async function createContact(
  data: CreateContactDTO
): Promise<ContactResponse> {
  const res = await api.post<ContactResponse>("/contacts", data);
  return res.data;
}

/** Busca contato pelo psicólogo */
export async function getContactByPsychologist(
  psychologistId: string
): Promise<ContactResponse | null> {
  const res = await api.get<ContactResponse[]>(`/contacts`, {
    params: { psychologistId },
  });
  return res.data[0] || null;
}

/** Atualiza o contato existente */
export async function updateContact(
  contactId: string,
  data: UpdateContactDTO
): Promise<ContactResponse> {
  const res = await api.patch<ContactResponse>(`/contacts/${contactId}`, data);
  return res.data;
}

/** Deleta o contato */
export async function deleteContact(contactId: string): Promise<void> {
  await api.delete(`/contacts/${contactId}`);
}
