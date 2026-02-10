import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {PATHS} from "../constants/routes"

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return children;
};

export const AuthRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return children;
};