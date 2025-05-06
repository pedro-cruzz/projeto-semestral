// src/components/PrivateRoute.tsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
