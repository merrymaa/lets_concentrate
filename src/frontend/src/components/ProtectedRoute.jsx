// Guard для защищённых маршрутов (react-router v6/v7).
// Во время восстановления сессии показываем loader и НЕ редиректим (без мигания).

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { status } = useAuth();

  if (status === 'restoring') {
    return <p className="auth-loader">Загрузка…</p>;
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
