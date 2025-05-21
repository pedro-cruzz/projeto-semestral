// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import NotFound from "../pages/NotFound";
import Blog from "../pages/Blog";
import Psicologos from "../pages/Psychologists";
import Login from "../pages/Login";
import { ChooseRegister } from "../pages/ChooseRegister";
import { Register } from "../pages/Register";
import { PsychologistProfile } from "../pages/PsychologistProfile";
import PrivateRoute from "../components/PrivateRoute";
import { PatientProfile } from "../pages/PatientProfile";
import { PsychologistsArticle } from "../pages/PsychologistsArticle";
import { CreateEditArticle } from "../pages/CreateEditArticle";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/choose-register" element={<ChooseRegister />} />
      <Route path="/register" element={<Register />} />

      {/* Exemplo: rota pública para dashboard ou home de usuários */}
      <Route path="/dashboard" element={<Home />} />
      <Route path="/psychologists" element={<Psicologos />} />
      {/* Rotas protegidas: Apenas usuários logados podem acessar */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/psychologist-profile/:psychologistId"
          element={<PsychologistProfile />}
        />
        <Route
          path="/patient-profile/:patientId"
          element={<PatientProfile />}
        />
        <Route
          path="/psychologist-article/:articleId"
          element={<PsychologistsArticle />}
        />

        <Route
          path="/psychologist-article/create"
          element={<CreateEditArticle />}
        />

        <Route
          path="/psychologist-article/:articleId/edit"
          element={<CreateEditArticle />}
        />
        {/* Outras rotas protegidas podem ser incluídas aqui */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
