// Layout защищённых маршрутов: шапка (email пользователя + кнопка выхода) + <Outlet />.
// Рендерится только под ProtectedRoute, поэтому на /login и /register не показывается.

import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // logout чистит токены и стейт; ProtectedRoute сам редиректит на /login
    logout();
  };

  return (
    <>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link to="/" style={{ color: 'var(--text-h)', textDecoration: 'none' }}>
          Концентратор
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>{user?.email}</span>
          <button className="counter" type="button" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
}
