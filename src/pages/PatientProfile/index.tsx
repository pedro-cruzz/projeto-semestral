import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { BaseLayout } from "../../components/BaseLayout";

import { ContainerCardProfile } from "../PsychologistProfile/components/CardProfile/styles";
import { getPatientById } from "../../services/getPatientById";
import userIcon from "../../assets/png/user.png";
import { AuthContext } from "../../contexts/AuthContext";
import { deletePatient } from "../../services/deletePatient";
import ConfirmDeleteModal from "./components/ModalDelete";
import {
  ButtonBack,
  Container,
  Image,
  NotFoundContainer,
  Separator,
} from "./styles";
import EditPatientModal from "./components/ModalEdit";
import CardProfile from "./components/CardProfile";
import { PatientResponse } from "../../dtos/registerPatient";
import {
  FavoriteWithPsychologist,
  getFavoritesByPatient,
} from "../../services/favoriteApi";
import { CardPsychologist } from "../Psychologists/components/CardPsychologist";

export function PatientProfile() {
  const { userId, patientId, signOut } = useContext(AuthContext);
  const { patientId: paramId } = useParams<{ patientId: string }>();
  const [favoritePsychologists, setFavoritePsychologists] = useState<
    FavoriteWithPsychologist[]
  >([]);
  const [patient, setPatient] = useState<PatientResponse | null>(null);
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

  useEffect(() => {
    if (patientId) {
      getFavoritesByPatient(patientId)
        .then((favorites) => {
          console.log("Favoritos com psicólogos:", favorites);
          setFavoritePsychologists(favorites);
        })
        .catch((error) => console.error("Erro:", error));
    }
  }, [patientId]);

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
          <Image src={patient.image || userIcon} alt="Perfil do paciente" />
          <CardProfile
            name={patient.name}
            birthDate={patient.birthDate}
            about={patient.about}
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

        {favoritePsychologists.map((psy) => (
          <Link
            to={`/psychologist-profile/${psy.psychologist.id}`}
            key={psy.id}
          >
            <CardPsychologist
              idPsychologist={psy.psychologist.id}
              name={psy.psychologist.name}
              about={psy.psychologist.about || ""}
              image={psy.psychologist.image || ""}
            />
          </Link>
        ))}
      </Container>
    </BaseLayout>
  );
}

export default PatientProfile;
