// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import NotFound from "../pages/NotFound";
import Blog from "../pages/Blog";
import Psicologos from "../pages/Psychologists";
import Login from "../pages/Login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/psychologists" element={<Psicologos />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
