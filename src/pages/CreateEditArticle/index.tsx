// src/pages/CreateEditArticle/index.tsx
import { useState, useEffect, FormEvent, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BaseLayout } from "../../components/BaseLayout";
import { InputFieldComponent } from "../../components/Forms/fields/InputField";
import { Button } from "../../components/Button";
import {
  ArticleResponse,
  CreateArticleDTO,
  UpdateArticleDTO,
} from "../../dtos/article";
import { TextArea } from "../PsychologistProfile/components/ModalEdit/syles";
import { getArticleById } from "../../services/getArticleById";
import { createArticle, updateArticle } from "../../services/registerArticle";
import { AuthContext } from "../../contexts/AuthContext";

// Import dos mesmos estilos usados na página de visualização
import {
  Container as PreviewContainer,
  Header as PreviewHeader,
  ContentTitle as PreviewContentTitle,
  Title as PreviewTitle,
  Subtitle as PreviewSubtitle,
  Image as PreviewImage,
  Divider as PreviewDivider,
  ContainerContent as PreviewContentWrap,
  ContentWrapper as PreviewContentWrapper,
  Content as PreviewContent,
} from "../PsychologistsArticle/styles";

import { Container, Form, Title, Wrapper, ErrorText } from "./styles";

export function CreateEditArticle() {
  const { psychologistId: ctxPsychologistId } = useContext(AuthContext);
  const location = useLocation();
  const qs = new URLSearchParams(location.search);
  const modeParam = qs.get("mode") as "create" | "edit";
  const idParam = qs.get("id") || "";
  const mode = modeParam || "create";
  const navigate = useNavigate();

  const [form, setForm] = useState<
    CreateArticleDTO & Partial<UpdateArticleDTO>
  >({
    psychologistId: ctxPsychologistId || "",
    title: "",
    subtitle: "",
    image: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    if (mode === "edit" && idParam) {
      getArticleById(idParam).then((a: ArticleResponse) => {
        setForm({
          psychologistId: a.psychologistId,
          title: a.title,
          subtitle: a.subtitle,
          image: a.image,
          content: a.content,
        });
        setLoading(false);
      });
    }
  }, [mode, idParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // limpa erro do campo
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const newErrors = { title: "", subtitle: "", content: "" };
    if (!form.title?.trim()) newErrors.title = "Título é obrigatório";
    if (!form.subtitle?.trim()) newErrors.subtitle = "Subtítulo é obrigatório";
    if (!form.content?.trim()) newErrors.content = "Conteúdo é obrigatório";
    setErrors(newErrors);
    return !newErrors.title && !newErrors.subtitle && !newErrors.content;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (mode === "create") {
        const dto: CreateArticleDTO = { ...(form as CreateArticleDTO) };
        const created = await createArticle(dto);
        navigate(`/psychologist-article/${created.id}`);
      } else {
        const dto: UpdateArticleDTO = {
          title: form.title!,
          subtitle: form.subtitle!,
          image: form.image!,
          content: form.content!,
        };
        await updateArticle(idParam, dto);
        navigate(`/psychologist-article/${idParam}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <BaseLayout $variant="secondary">
        <div>Carregando...</div>
      </BaseLayout>
    );

  return (
    <BaseLayout $variant="secondary">
      <Wrapper>
        <Container>
          <Title>{mode === "create" ? "Criar Artigo" : "Editar Artigo"}</Title>

          <Form onSubmit={handleSubmit}>
            <InputFieldComponent
              label="Título"
              name="title"
              value={form.title}
              onChange={handleChange}
              style={{ width: "800px" }}
              helperText={errors.title}
            />
            <InputFieldComponent
              label="Subtítulo"
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              style={{ width: "800px" }}
              helperText={errors.subtitle}
            />
            <InputFieldComponent
              label="URL da Imagem"
              name="image"
              value={form.image}
              onChange={handleChange}
              style={{ width: "800px" }}
            />
            <div style={{ width: "800px" }}>
              <TextArea
                name="content"
                rows={10}
                placeholder="Conteúdo do artigo"
                value={form.content}
                onChange={handleChange}
              />
              {errors.content && <ErrorText>{errors.content}</ErrorText>}
            </div>
            <Button
              type="submit"
              width="400px"
              $variant="secondary"
              disabled={
                !form.title.trim() ||
                !form.subtitle.trim() ||
                !form.content.trim()
              }
            >
              {mode === "create" ? "Criar" : "Salvar"}
            </Button>
          </Form>
        </Container>

        {/* --- Pré-visualização --- */}
        <PreviewContainer>
          <PreviewHeader>
            <PreviewContentTitle>
              <PreviewTitle>{form.title || "Título de Exemplo"}</PreviewTitle>
              <PreviewSubtitle>
                {form.subtitle || "Subtítulo de Exemplo"}
              </PreviewSubtitle>
            </PreviewContentTitle>
            {form.image && (
              <PreviewImage src={form.image} alt="Prévia da imagem" />
            )}
          </PreviewHeader>

          <PreviewDivider />

          <PreviewContentWrap>
            <PreviewContentWrapper>
              <PreviewContent style={{ whiteSpace: "pre-wrap" }}>
                {form.content ||
                  "Comece a digitar o conteúdo do seu artigo aqui..."}
              </PreviewContent>
            </PreviewContentWrapper>
          </PreviewContentWrap>
        </PreviewContainer>
      </Wrapper>
    </BaseLayout>
  );
}

export default CreateEditArticle;
