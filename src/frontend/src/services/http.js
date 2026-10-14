// Единый HTTP-клиент фронта.
// Пути всегда относительные: /api/... (в dev проксируются Vite на http://localhost:8000).

// TODO: безопасность. refreshToken в localStorage уязвим к XSS.
// В проде: refresh — httpOnly cookie, access token — только in-memory.
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Вызывается при неудачном refresh: стор разлогинивает пользователя.
let onUnauthorized = () => {};
export function setOnUnauthorized(callback) {
  onUnauthorized = callback;
}

// single-flight: если N параллельных запросов получили 401,
// /refresh вызывается ровно один раз, остальные ждут этот промис.
let refreshPromise = null;

async function doRefresh() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) return false;
      try {
        // rawRequest без auth — чтобы 401 на самом refresh не зацикливал обработку
        const tokens = await rawRequest('/api/refresh', {
          method: 'POST',
          body: { refreshToken },
        });
        setTokens(tokens);
        return true;
      } catch {
        // /refresh вернул 401 (или иную ошибку) — разлогин, без повторных попыток
        clearTokens();
        onUnauthorized();
        return false;
      } finally {
        // сбрасываем асинхронно, чтобы все ожидающие успели прочитать промис
        setTimeout(() => {
          refreshPromise = null;
        }, 0);
      }
    })();
  }
  return refreshPromise;
}

class HttpError extends Error {
  constructor(status, payload) {
    super(`HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
    // FastAPI кладёт текст ошибки в поле detail, либо при 422 — массив errors
    this.detail = payload?.detail ?? null;
    this.payload = payload;
  }
}

export { HttpError };

async function parseResponse(response) {
  let payload = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { detail: text };
    }
  }
  return payload;
}

async function rawRequest(path, { method = 'GET', body, withAuth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (withAuth) {
    const token = getAccessToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload = await parseResponse(response);
  if (!response.ok) {
    throw new HttpError(response.status, payload);
  }
  return payload;
}

/**
 * Основной метод клиента.
 * @param {string} path - относительный путь, например /api/me
 * @param {object} options
 * @param {boolean} options.auth - добавлять Bearer-заголовок и включать авто-refresh на 401.
 *   login/register/logout вызываются без auth → их 4xx НЕ запускают refresh.
 */
export async function request(path, options = {}) {
  const { auth = false, ...rest } = options;

  if (!auth) {
    return rawRequest(path, { ...rest, withAuth: false });
  }

  try {
    return await rawRequest(path, { ...rest, withAuth: true });
  } catch (error) {
    if (error instanceof HttpError && error.status === 401) {
      // одна попытка: refresh -> повтор оригинального запроса
      const refreshed = await doRefresh();
      if (refreshed) {
        return rawRequest(path, { ...rest, withAuth: true });
      }
    }
    throw error;
  }
}
