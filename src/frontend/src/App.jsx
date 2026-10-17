import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { saveSession } from "./services/statsApi.js";
import "./App.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
function Hexagon() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <polygon
        points="100,10 190,70 190,150 100,190 10,150 10,70"
        fill="none"
        stroke="black"
        strokeWidth="3"
      />
      <line
        x1="100"
        y1="10"
        x2="100"
        y2="190"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="10"
        y1="70"
        x2="190"
        y2="70"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="10"
        y1="150"
        x2="190"
        y2="150"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="60"
        y1="40"
        x2="140"
        y2="160"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="140"
        y1="40"
        x2="60"
        y2="160"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function Octagon() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <polygon
        points="
          100,10
          160,30
          190,70
          190,130
          160,170
          100,190
          40,170
          10,130
          10,70
          40,30
        "
        fill="none"
        stroke="black"
        strokeWidth="3"
      />
      <line
        x1="100"
        y1="10"
        x2="100"
        y2="190"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="10"
        y1="100"
        x2="190"
        y2="100"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="40"
        y1="30"
        x2="160"
        y2="170"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="160"
        y1="30"
        x2="40"
        y2="170"
        stroke="black"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function Dodecagon() {
  const points = [];
  const centerX = 100;
  const centerY = 100;
  const radius = 90;

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <polygon
        points={points.join(" ")}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      {[0, 30, 60, 90, 120, 150].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = centerX + radius * 0.8 * Math.cos(rad);
        const y = centerY + radius * 0.8 * Math.sin(rad);
        const x2 = centerX + radius * 0.8 * Math.cos(rad + Math.PI);
        const y2 = centerY + radius * 0.8 * Math.sin(rad + Math.PI);
        return (
          <line
            key={angle}
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth="1"
            opacity="0.2"
          />
        );
      })}
    </svg>
  );
}

function SimpleMandala() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="black"
        strokeWidth="1.5"
      />
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="none"
        stroke="black"
        strokeWidth="1"
      />
      <circle
        cx="100"
        cy="100"
        r="20"
        fill="none"
        stroke="black"
        strokeWidth="1"
      />

      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 2 * Math.PI;
        const x1 = 100 + 85 * Math.cos(angle);
        const y1 = 100 + 85 * Math.sin(angle);
        const x2 = 100 + 55 * Math.cos(angle);
        const y2 = 100 + 55 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth="2"
          />
        );
      })}

      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 2 * Math.PI + Math.PI / 8;
        const x1 = 100 + 70 * Math.cos(angle);
        const y1 = 100 + 70 * Math.sin(angle);
        const x2 = 100 + 50 * Math.cos(angle);
        const y2 = 100 + 50 * Math.sin(angle);
        return (
          <line
            key={i + 8}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth="1.5"
            opacity="0.7"
          />
        );
      })}
    </svg>
  );
}

function ComplexMandala() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {[20, 40, 60, 80, 100, 120].map((r) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="black"
          strokeWidth={r % 40 === 0 ? "2" : "1"}
          opacity={r % 40 === 0 ? "1" : "0.4"}
        />
      ))}

      {[...Array(16)].map((_, i) => {
        const angle = (i / 16) * 2 * Math.PI;
        const x = 100 + 90 * Math.cos(angle);
        const y = 100 + 90 * Math.sin(angle);
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={x}
            y2={y}
            stroke="black"
            strokeWidth={i % 2 === 0 ? "1.5" : "0.5"}
            opacity={i % 2 === 0 ? "1" : "0.3"}
          />
        );
      })}

      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 2 * Math.PI;
        const r = 80;
        const x = 100 + r * Math.cos(angle);
        const y = 100 + r * Math.sin(angle);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="8"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
          />
        );
      })}

      <circle
        cx="100"
        cy="100"
        r="10"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <circle cx="100" cy="100" r="4" fill="black" />
    </svg>
  );
}

function PatternMandala() {
  const petals = [...Array(12)];

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="black"
        strokeWidth="1"
      />

      {petals.map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI;
        const nextAngle = ((i + 1) / 12) * 2 * Math.PI;
        const r1 = 75;
        const r2 = 60;

        const x1 = 100 + r1 * Math.cos(angle);
        const y1 = 100 + r1 * Math.sin(angle);
        const x2 = 100 + r2 * Math.cos(angle);
        const y2 = 100 + r2 * Math.sin(angle);
        const x3 = 100 + r2 * Math.cos(nextAngle);
        const y3 = 100 + r2 * Math.sin(nextAngle);
        const x4 = 100 + r1 * Math.cos(nextAngle);
        const y4 = 100 + r1 * Math.sin(nextAngle);

        return (
          <polygon
            key={i}
            points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`}
            fill="none"
            stroke="black"
            strokeWidth="1"
            opacity={i % 2 === 0 ? "0.8" : "0.4"}
          />
        );
      })}

      <circle
        cx="100"
        cy="100"
        r="45"
        fill="none"
        stroke="black"
        strokeWidth="1.5"
      />
      <circle
        cx="100"
        cy="100"
        r="25"
        fill="none"
        stroke="black"
        strokeWidth="1"
      />

      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 2 * Math.PI + Math.PI / 8;
        const r = 35;
        const x = 100 + r * Math.cos(angle);
        const y = 100 + r * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="3" fill="black" />;
      })}
    </svg>
  );
}

function TimerPage() {
  // объекты для концентрации
  const objects = [
    { id: "hexagon", label: "Шестиугольник", component: <Hexagon /> },
    { id: "octagon", label: "Восьмиугольник", component: <Octagon /> },
    { id: "dodecagon", label: "Двенадцатиугольник", component: <Dodecagon /> },
    { id: "mandala1", label: "Мандала простая", component: <SimpleMandala /> },
    { id: "mandala2", label: "Мандала сложная", component: <ComplexMandala /> },
    { id: "mandala3", label: "Мандала узор", component: <PatternMandala /> },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedObject, setSelectedObject] = useState(objects[0]);

  const selectNextObject = () => {
    const nextIndex = (currentIndex + 1) % objects.length; // Переключение по кругу
    setCurrentIndex(nextIndex);
    setSelectedObject(objects[nextIndex]);
  };


  // таймер
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // сессия концентрации: время старта (ISO), последняя сохранённая/несохранённая сессия,
  // статус сохранения и inline-сообщения
  const [startedAt, setStartedAt] = useState(null);
  const [lastResult, setLastResult] = useState(null); // snapshot метрик завершённой сессии
  const [lastUnsavedSession, setLastUnsavedSession] = useState(null); // не потеряна при ошибке сети
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null); // { kind: 'success' | 'error', text }
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // «Старт» — существующее поведение сохранено: запускает отсчёт.
  // Добавлено: фиксируем startedAtIso, чистим lastResult, предупреждаем о несохранённой сессии.
  const startTimer = () => {
    if (lastUnsavedSession) {
      const ok = window.confirm(
        "Есть несохранённая сессия. Начать новую?"
      );
      if (!ok) return;
      setLastUnsavedSession(null);
      setSaveMessage(null);
    }
    setStartedAt(new Date().toISOString());
    setLastResult(null);
    setShowResults(false);
    setIsRunning(true);
  };
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  // авто-скрытие успешного сообщения через 4 секунды
  useEffect(() => {
    if (saveMessage?.kind !== "success") return;
    const t = setTimeout(() => setSaveMessage(null), 4000);
    return () => clearTimeout(t);
  }, [saveMessage]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // мм:сс для метрик (часы добавляем только если они есть)
  const formatMmSs = (totalSeconds) => {
    const s = Math.max(0, Math.round(totalSeconds));
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    const h = Math.floor(s / 3600);
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  };

  // Метрики считаются на фронте из текущих значений (или snapshot'а)
  const buildMetrics = (t, n) => ({
    durationSec: t,
    distractions: n,
    efficiencyPerMin: t > 0 ? (n / t) * 60 : 0, // N/T, отвлечений в минуту
    avgTimeToDistractionSec: t, // T/(N+1) или T при N=0 — см. ниже
  });

  const currentMetrics = () => {
    const t = lastResult ? lastResult.durationSec : seconds;
    const n = lastResult ? lastResult.distractions : count;
    return buildMetrics(t, n);
  };

  // сессия активна: таймер идёт или есть накопленное время (объявлено до обработчиков)
  const sessionActive = isRunning || seconds > 0;

  // Сохранение (или повтор) последней завершённой несохранённой сессии
  const finishSession = async () => {
    // если есть несохранённый snapshot — это «Повторить сохранение»
    if (lastUnsavedSession && !sessionActive) {
      await persistSession(lastUnsavedSession);
      return;
    }

    // обычное «Закончить сессию»
    if (seconds === 0) {
      // пустая сессия (T=0) — не сохраняем, понятное inline-сообщение
      setSaveMessage({ kind: "error", text: "Сессия пустая, сохранять нечего" });
      return;
    }

    setIsRunning(false);

    const snapshot = {
      focusTimeSec: seconds,
      distractions: count,
      startedAtIso: startedAt ?? new Date().toISOString(),
    };

    // snapshot метрик для кнопки «Результаты» (остаётся до следующего «Старт»)
    setLastResult(buildMetrics(snapshot.focusTimeSec, snapshot.distractions));
    setShowResults(true);
    setLastUnsavedSession(snapshot);

    await persistSession(snapshot);
  };

  const persistSession = async (snapshot) => {
    setIsSaving(true);
    setSaveMessage(null);
    try {
      await saveSession(snapshot);
      setLastUnsavedSession(null);
      // сброс локального стейта сессии: следующий «Старт» начнёт с нуля
      setSeconds(0);
      setCount(0);
      setStartedAt(null);
      setSaveMessage({
        kind: "success",
        text: `Сессия сохранена: ${formatMmSs(snapshot.focusTimeSec)}, ${snapshot.distractions} ${pluralDistractions(snapshot.distractions)}`,
      });
    } catch (error) {
      const status = error?.status;
      let text = "Не удалось сохранить сессию.";
      if (status === 401 || status === 403) text += " Сессия авторизации истекла — войдите заново.";
      else if (status >= 500) text += " Сервер временно недоступен.";
      else if (!status) text += " Проверьте подключение к сети.";
      setSaveMessage({ kind: "error", text });
      // lastUnsavedSession НЕ очищаем — данные сессии не теряются, можно повторить
    } finally {
      setIsSaving(false);
    }
  };

  const pluralDistractions = (n) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return "отвлечение";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "отвлечения";
    return "отвлечений";
  };

  const metrics = currentMetrics();
  const canShowResults = Boolean(lastResult) || sessionActive;

  return (
    <div className="App">
      {/* <h1>Тренировка концентрации</h1> */}

      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1> Тренировка концентрации</h1>

        <button
          onClick={selectNextObject}
          style={{
            padding: "15px 40px",
            fontSize: "18px",
            borderRadius: "50px",
            // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            cursor: "pointer",
            margin: "20px",
          }}
        >
          Выбрать объект
        </button>

        {/* карточка объекта + колонка кнопок справа; переносится на узких экранах */}
        <div className="focus-row">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              margin: "20px auto",
              maxWidth: "300px",
              minHeight: "300px",
            }}
          >
            {selectedObject.component}
          </div>

          <div className="focus-actions">
            <button
              className="session-btn"
              onClick={finishSession}
              disabled={isSaving}
            >
              {lastUnsavedSession && !sessionActive
                ? "📤 Повторить сохранение"
                : "✅ Закончить сессию"}
            </button>

            <button
              className="session-btn session-btn-secondary"
              onClick={() => setShowResults((v) => !v)}
              disabled={!canShowResults}
              title={!canShowResults ? "Сначала запустите таймер" : undefined}
            >
              📊 Результаты текущей сессии
            </button>

            {showResults && (lastResult || sessionActive) && (
              <div className="session-results">
                <h3>Результаты {lastResult ? "завершённой" : "текущей"} сессии</h3>
                <p>
                  Длительность:{" "}
                  <strong>{formatMmSs(metrics.durationSec)}</strong>
                </p>
                <p>
                  Отвлечения: <strong>{metrics.distractions}</strong>
                </p>
                <p>
                  Индекс эффективности:{" "}
                  <strong>
                    {metrics.durationSec > 0
                      ? `${metrics.efficiencyPerMin.toFixed(1)} отвл./мин`
                      : "—"}
                  </strong>
                </p>
                <p>
                  Среднее время до отвлечения:{" "}
                  <strong>
                    {metrics.durationSec > 0
                      ? metrics.distractions === 0
                        ? `${formatMmSs(metrics.durationSec)} (без отвлечений)`
                        : formatMmSs(
                            metrics.durationSec / (metrics.distractions + 1)
                          )
                      : "—"}
                  </strong>
                </p>
              </div>
            )}

            {saveMessage && (
              <p
                className={
                  saveMessage.kind === "success"
                    ? "session-msg session-msg-success"
                    : "session-msg session-msg-error"
                }
              >
                {saveMessage.text}
              </p>
            )}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>⏱</h1>

        <div style={{ fontSize: "48px", margin: "20px" }}>
          {formatTime(seconds)}
        </div>

        <div>
          <button onClick={startTimer} disabled={isRunning}>
            ▶️ Старт
          </button>
          <button onClick={stopTimer} disabled={!isRunning}>
            ⏸️ Стоп
          </button>
          <button onClick={resetTimer}>🔄 Сброс</button>
        </div>
        <p>==============</p>
        <p> Количество отвлечений {count}</p>
        <button onClick={() => setCount(count + 1)}>Отвлекся</button>
        <button onClick={() => setCount(0)}>Сброс</button>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>404</h1>
      <p>
        Страница не найдена. <Link to="/">На главную</Link>
      </p>
    </div>
  );
}

function App() {
  return (
    // BrowserRouter обязателен здесь: в dev-режиме main.jsx рендерит App напрямую,
    // а Router есть только в prod-обёртке (main-production.jsx)
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        {/* Публичные маршруты */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Защищённые: guard + layout с шапкой (на /login и /register не рендерится) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<TimerPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
