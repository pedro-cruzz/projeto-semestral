// services/addressApi.ts
import api from "./api";
import {
  AddressResponse,
  CreateAddressDTO,
  UpdateAddressDTO,
} from "./../dtos/adresss";

/** Cria novo endereço */
export async function createAddress(
  data: CreateAddressDTO
): Promise<AddressResponse> {
  const res = await api.post<AddressResponse>("/addresses", data);
  return res.data;
}

/** Busca endereço pelo psicólogo */
export async function getAddressByPsychologist(
  psychologistId: string
): Promise<AddressResponse | null> {
  const res = await api.get<AddressResponse[]>(`/addresses`, {
    params: { psychologistId },
  });
  return res.data[0] || null;
}

/** Atualiza o endereço existente */
export async function updateAddress(
  addressId: string,
  data: UpdateAddressDTO
): Promise<AddressResponse> {
  const res = await api.patch<AddressResponse>(`/addresses/${addressId}`, data);
  return res.data;
}

/** Deleta o endereço */
export async function deleteAddress(addressId: string): Promise<void> {
  await api.delete(`/addresses/${addressId}`);
}
