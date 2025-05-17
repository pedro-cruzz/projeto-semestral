// dtos/address.ts
export interface AddressResponse {
  id: string;
  psychologistId: string;
  country?: string;
  uf?: string;
  cep?: string;
  city?: string;
  district?: string; // bairro
  street?: string;
  number?: string;
  complement?: string; // opcional extra
}

export interface CreateAddressDTO {
  psychologistId: string;
  country?: string;
  uf?: string;
  cep?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface UpdateAddressDTO {
  country?: string;
  uf?: string;
  cep?: string;
  city?: string;
  district?: string;
  street?: string;
  number?: string;
  complement?: string;
}
