// Стор авторизации на React Context + useReducer (новых зависимостей нет).
// Восстановление сессии при старте:
//   1. есть accessToken -> GET /me (при 401 клиент сам сделает refresh и повторит)
//   2. accessToken нет, refreshToken есть -> silent refresh -> /me
//   3. refresh не удался -> чистый стейт (UNAUTHENTICATED)
// Пока статус RESTORING — рендерим loader, редиректа на /login нет (без мигания).

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import * as authApi from '../services/authApi';
import { setTokens, clearTokens, getRefreshToken, setOnUnauthorized } from '../services/http';

const AuthContext = createContext(null);

const initialState = {
  user: null, // { uuid, email, data_created } — ответ GET /me
  status: 'restoring', // restoring | authenticated | unauthenticated
};

function reducer(state, action) {
  switch (action.type) {
    case 'AUTHENTICATED':
      return { user: action.user, status: 'authenticated' };
    case 'UNAUTHENTICATED':
      return { user: null, status: 'unauthenticated' };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Разлогин из http-клиента: refresh не удался -> чистим стейт
  useEffect(() => {
    setOnUnauthorized(() => dispatch({ type: 'UNAUTHENTICATED' }));
  }, []);

  // Автологин при перезагрузке страницы
  useEffect(() => {
    let cancelled = false;

    async function restore() {
      try {
        if (!getRefreshToken()) {
          // токенов нет — сразу чистый стейт
          if (!cancelled) dispatch({ type: 'UNAUTHENTICATED' });
          return;
        }
        const user = await authApi.me(); // при истёкшем access клиент сам обновит пару токенов
        if (!cancelled) dispatch({ type: 'AUTHENTICATED', user });
      } catch {
        clearTokens();
        if (!cancelled) dispatch({ type: 'UNAUTHENTICATED' });
      }
    }

    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      user: state.user,
      status: state.status,
      isAuthenticated: state.status === 'authenticated',

      async login(credentials) {
        const tokens = await authApi.login(credentials); // { type, accessToken, refreshToken }
        setTokens(tokens);
        const user = await authApi.me();
        dispatch({ type: 'AUTHENTICATED', user });
      },

      async register(formData) {
        // /register возвращает только message, без токена —
        // автологин через сразу следующий вызов /login (по согласованию).
        // login() берём из замыкания value-объекта нельзя, поэтому дублируем логику:
        await authApi.register(formData);
        const tokens = await authApi.login({
          login: formData.email,
          password: formData.password,
        });
        setTokens(tokens);
        const user = await authApi.me();
        dispatch({ type: 'AUTHENTICATED', user });
      },

      async logout() {
        await authApi.logout(); // чистит токены внутри, ошибки сервера игнорирует
        dispatch({ type: 'UNAUTHENTICATED' });
      },
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен вызываться внутри <AuthProvider>');
  }
  return context;
}
