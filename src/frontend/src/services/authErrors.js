// Маппинг ошибок бэка в тексты на русском (язык интерфейса — русский, как в App.jsx).
// Коды взяты из src/backend/api/routes.py:
//   401 /login -> detail "Invalid login or password"
//   409 /register -> detail "Login exists"
//   422 -> ошибка валидации Pydantic

import { HttpError } from '../services/http';

export function getAuthErrorMessage(error) {
  if (error instanceof HttpError) {
    switch (error.status) {
      case 400:
        return 'Некорректный запрос. Попробуйте ещё раз.';
      case 401:
        return 'Неверный логин или пароль.';
      case 409:
        return 'Этот email уже зарегистрирован.';
      case 422:
        return 'Проверьте правильность заполнения полей.';
      default:
        return 'Сервер временно недоступен. Попробуйте позже.';
    }
  }
  // fetch бросает TypeError при обрыве сети / недоступном сервере
  if (error instanceof TypeError) {
    return 'Сервер недоступен, проверьте подключение и попробуйте ещё раз.';
  }
  return 'Произошла неизвестная ошибка. Попробуйте ещё раз.';
}
