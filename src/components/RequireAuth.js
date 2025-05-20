/* 

RequireAuth.js

Компонент для защиты маршрутов от несанкционированного доступа

*/

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RequireAuth({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(user.role?.trim()?.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return children;
}