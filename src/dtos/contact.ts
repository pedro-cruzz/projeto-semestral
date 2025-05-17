// dtos/contact.ts
export interface ContactResponse {
  id: string;
  psychologistId: string;
  linkedin?: string;
  gmail?: string;
  whatsapp?: string;
  // se quiser estender:
  phone?: string;
  instagram?: string;
}

export interface CreateContactDTO {
  psychologistId: string;
  linkedin?: string;
  gmail?: string;
  whatsapp?: string;
  phone?: string;
  instagram?: string;
}

export interface UpdateContactDTO {
  linkedin?: string;
  gmail?: string;
  whatsapp?: string;
  phone?: string;
  instagram?: string;
}
