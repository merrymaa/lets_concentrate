// Страница входа. Поля соответствуют бэку: JwtRequest { login, password }
// (routes.py -> POST /login). Валидация синхронизирована с UserRegister:
// email обязателен и валиден, пароль >= 6 символов.

import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../services/authErrors';
import './Auth.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { login, status } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // уже авторизован — не показываем форму входа
  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!EMAIL_PATTERN.test(form.login)) {
      return 'Введите корректный email.';
    }
    if (form.password.length < 6) {
      return 'Пароль должен быть не короче 6 символов.';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await login({ login: form.login, password: form.password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h2>Вход</h2>

        <div className="auth-field">
          <label htmlFor="login">Email</label>
          <input
            id="login"
            name="login"
            type="email"
            autoComplete="email"
            value={form.login}
            onChange={handleChange}
            disabled={submitting}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            disabled={submitting}
            required
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-submit" type="submit" disabled={submitting}>
          {submitting ? 'Входим…' : 'Войти'}
        </button>

        <p className="auth-switch">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
}
