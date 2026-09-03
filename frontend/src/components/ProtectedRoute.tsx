import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/auth.service";
export function ProtectedRoute() {
  return authService.loggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
}
