// Stats-API. Пути и поля точно соответствуют бэку (src/backend/api/routes.py,
// POST /add + схема schemas/statistics.py):
//   POST /api/add  { user?, session_date?, type_timer, focus_time_sec, count_distraction }
//                  -> 201 { message } | 422 (валидация) | 500 { detail } ; требует Bearer-токен.
//
// ОСОЗНАННОЕ РЕШЕНИЕ (согласовано): переиспользуем существующую модель Statistics
// без миграции. Поля «id объекта концентрации» и точные start/finish сессии в этой
// задаче НЕ сохраняются — схема таблицы их не содержит. Если понадобится —
// отдельная задача с миграцией. session_date = момент нажатия «Старт» (startedAt).

import { request } from './http';

// Единственное место, где задаётся тип таймера для сессий концентрации.
export const SESSION_TYPE = 'focus';

/**
 * Сохраняет завершённую сессию концентрации.
 * @param {object} session
 * @param {number} session.focusTimeSec - длительность сессии в секундах (T)
 * @param {number} session.distractions - количество отвлечений (N)
 * @param {string} session.startedAtIso - ISO-время старта сессии (в session_date)
 */
export function saveSession({ focusTimeSec, distractions, startedAtIso }) {
  return request('/api/add', {
    method: 'POST',
    auth: true,
    body: {
      type_timer: SESSION_TYPE,
      focus_time_sec: focusTimeSec,
      count_distraction: distractions,
      session_date: startedAtIso ?? new Date().toISOString(),
    },
  });
}
