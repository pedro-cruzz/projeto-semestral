import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { BaseLayout } from "../../components/BaseLayout";

import { ContainerCardProfile } from "../PsychologistProfile/components/CardProfile/styles";
import { getPatientById } from "../../services/getPatientById";
import userIcon from "../../assets/png/user.png";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components/Button";
import { deletePatient } from "../../services/deletePatient";
import ConfirmDeleteModal from "./components/ModalDelete";
import { ButtonBack, Container, NotFoundContainer, Separator } from "./styles";
import EditPatientModal from "./components/ModalEdit";
import CardProfile from "./components/CardProfile";

export function PatientProfile() {
  const { userId, patientId, signOut } = useContext(AuthContext);
  const { patientId: paramId } = useParams<{ patientId: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patient, setPatient] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentPatient, setCurrentPatient] = useState<any | null>(null);
  const navigate = useNavigate();

  const isOwnProfile = patient?.userId === userId;

  useEffect(() => {
    if (patient) {
      setCurrentPatient(patient);
    }
  }, [patient]);

  useEffect(() => {
    const id = paramId || patientId;
    if (!id) {
      setLoading(false);
      return;
    }
    getPatientById(id)
      .then((data) => setPatient(data))
      .catch((err) => {
        console.error("Erro ao buscar perfil de paciente:", err);
        setPatient(null);
      })
      .finally(() => setLoading(false));
  }, [paramId, patientId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateProfile = (updatedData: any) => {
    setCurrentPatient(updatedData);
    setPatient(updatedData);
  };

  const handleDelete = async () => {
    if (!patient) return;
    try {
      await deletePatient(patient.id);
      signOut();
      navigate("/");
    } catch (error) {
      console.error("Erro ao deletar paciente:", error);
    }
  };

  if (loading) {
    return (
      <BaseLayout $variant="secondary">
        <div>Carregando...</div>
      </BaseLayout>
    );
  }

  if (!patient) {
    return (
      <BaseLayout $variant="secondary">
        <NotFoundContainer>
          <ButtonBack>
            <div />
            <Link to="/">
              <img src={userIcon} alt="back" width={30} />
            </Link>
          </ButtonBack>
          <h1>Paciente não encontrado!</h1>
        </NotFoundContainer>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout $variant="secondary">
      <Container>
        <ContainerCardProfile>
          <img src={patient.image || userIcon} alt="Perfil do paciente" />
          <CardProfile
            name={patient.name}
            birthDate={patient.birthDate}
            showActionButtons={isOwnProfile}
            onEditClick={() => setEditModalOpen(true)}
            onDeleteClick={() => setDeleteModalOpen(true)}
          />
        </ContainerCardProfile>

        {/* Modals para editar e deletar */}
        {currentPatient && (
          <EditPatientModal
            patient={currentPatient}
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUpdate={handleUpdateProfile}
          />
        )}
        {currentPatient && (
          <ConfirmDeleteModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
        )}

        <Separator />

        <Link to="/dashboard">
          <Button borderRadius="10px">Voltar</Button>
        </Link>
      </Container>
    </BaseLayout>
  );
}

export default PatientProfile;
