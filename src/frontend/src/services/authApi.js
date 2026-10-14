// Auth-API. Пути и поля точно соответствуют бэку (src/backend/api/routes.py,
// router = APIRouter() БЕЗ prefix, main.py: app.include_router(router)):
//   POST /register  { email, password }     -> 201 { message } | 409 { detail: "Login exists" } | 422
//   POST /login     { login, password }     -> 200 JwtResponse { type, accessToken, refreshToken } | 401
//   POST /refresh   { refreshToken }        -> 200 JwtResponse | 401
//   GET  /me        (Bearer accessToken)    -> 200 { uuid, email, data_created } | 401
//   POST /logout    — на бэке ЕЩЁ НЕТ (фронт игнорирует 404/405/501)

import { request, clearTokens } from './http';

export function register({ email, password }) {
  return request('/api/register', { method: 'POST', body: { email, password } });
}

export function login({ login: loginValue, password }) {
  // Поле называется login (JwtRequest), бэк сверяет его с email пользователя
  return request('/api/login', {
    method: 'POST',
    body: { login: loginValue, password },
  });
}

export function refresh(refreshToken) {
  return request('/api/refresh', { method: 'POST', body: { refreshToken } });
}

export function me() {
  return request('/api/me', { auth: true });
}

// Logout-эндпоинта на бэке пока нет: отправляем запрос, но 404/405/501 игнорируем —
// локальная очистка состояния выполняется в любом случае.
export async function logout() {
  try {
    await request('/api/logout', { method: 'POST' });
  } catch (error) {
    // не блокируем пользователя, если эндпоинт отсутствует или недоступен
    console.warn('logout: сервер не поддержал выход, выполняем локальную очистку', error);
  } finally {
    clearTokens();
  }
}
