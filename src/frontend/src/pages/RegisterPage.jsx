// Страница регистрации. Поля соответствуют бэку: UserRegister { email, password }
// (schemas/user_register.py: EmailStr, password min_length=6).
// Подтверждение пароля — только на фронте. После успешного /register
// автологин через /login выполняется в AuthContext.register().

import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../services/authErrors';
import './Auth.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const { register, status } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!EMAIL_PATTERN.test(form.email)) {
      return 'Введите корректный email.';
    }
    if (form.password.length < 6 || form.password.length > 100) {
      return 'Пароль должен содержать от 6 до 100 символов.';
    }
    if (form.password !== form.confirmPassword) {
      return 'Пароли не совпадают.';
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
      await register({ email: form.email, password: form.password });
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
        <h2>Регистрация</h2>

        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
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
            autoComplete="new-password"
            minLength={6}
            maxLength={100}
            value={form.password}
            onChange={handleChange}
            disabled={submitting}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="confirmPassword">Подтверждение пароля</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={submitting}
            required
          />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-submit" type="submit" disabled={submitting}>
          {submitting ? 'Создаём аккаунт…' : 'Зарегистрироваться'}
        </button>

        <p className="auth-switch">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
}
