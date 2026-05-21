import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  isAuth,
}: {
  isAuth: boolean;
}) {
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}