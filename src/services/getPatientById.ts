// services/getPatientById.ts
import { PatientResponse, ApiError } from "../dtos/registerPatient";

export async function getPatientById(
  patientId: string
): Promise<PatientResponse> {
  const res = await fetch(`http://localhost:3001/patients/${patientId}`);
  if (!res.ok) {
    const err: ApiError = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
