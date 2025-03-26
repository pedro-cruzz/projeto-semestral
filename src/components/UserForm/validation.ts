import { z } from "zod";

// Regex para validar telefone brasileiro com DDD
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;

// Schemas base sem transformações
const baseSchemas = {
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s']+$/, "O nome deve conter apenas letras"),

  phone: z
    .string()
    .min(14, "O telefone deve estar no formato (99) 99999-9999")
    .max(15, "O telefone deve estar no formato (99) 99999-9999")
    .refine((value) => phoneRegex.test(value)),

  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido (exemplo: email@dominio.com)")
    .max(100, "O e-mail deve ter no máximo 100 caracteres"),
};

// Schema completo com transformações
export const userSchema = z
  .object({
    name: baseSchemas.name,
    phone: baseSchemas.phone.transform((value) => value.replace(/\D/g, "")),
    email: baseSchemas.email.transform((value) => value.toLowerCase().trim()),
  })
  .refine(
    (data) => {
      return !data.name.includes(data.email.split("@")[0]);
    },
    {
      message: "O nome não pode conter parte do e-mail",
      path: ["name"],
    }
  );

// Tipo derivado do schema
export type UserFormValues = z.infer<typeof userSchema>;

// Schemas parciais para validação de campos individuais
export const userFieldSchemas = {
  name: z.object({ name: baseSchemas.name }),
  phone: z.object({ phone: baseSchemas.phone }),
  email: z.object({ email: baseSchemas.email }),
};
