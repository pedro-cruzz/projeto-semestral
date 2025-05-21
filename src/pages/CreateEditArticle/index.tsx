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
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        const dto: CreateArticleDTO = { ...(form as CreateArticleDTO) };
        const created = await createArticle(dto);
        navigate(`/psychologist-article/${created.id}`);
      } else {
        const dto: UpdateArticleDTO = {
          title: form.title,
          subtitle: form.subtitle,
          image: form.image,
          content: form.content,
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
      <h1>{mode === "create" ? "Criar Artigo" : "Editar Artigo"}</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <InputFieldComponent
          label="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <InputFieldComponent
          label="Subtítulo"
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
        />
        <InputFieldComponent
          label="URL da Imagem"
          name="image"
          value={form.image}
          onChange={handleChange}
        />
        <TextArea
          name="content"
          rows={10}
          placeholder="Conteúdo do artigo"
          value={form.content}
          onChange={handleChange}
        />
        <Button type="submit">{mode === "create" ? "Criar" : "Salvar"}</Button>
      </form>
    </BaseLayout>
  );
}
export default CreateEditArticle;
