import { useState, useEffect } from "react";
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

function App() {
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

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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

export default App;
