// services/getAllPatients.ts
import api from "./api";
import { PatientResponse } from "../dtos/registerPatient";

/**
 * Busca todos os pacientes.
 */
export async function getAllPatients(): Promise<PatientResponse[]> {
  const response = await api.get<PatientResponse[]>("/patients");
  if (response.status !== 200) {
    throw new Error("Erro ao buscar pacientes");
  }
  return response.data;
}
