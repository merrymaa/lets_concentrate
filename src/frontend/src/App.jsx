import { useState, useEffect } from "react"

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const [selectedObject, setSelectedObject] = useState(null);

  const objects = ['⭐', '🔴', '🔵', '🟢', '🎯', '💎'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectNextObject = () => {
    const nextIndex = (currentIndex + 1) % objects.length; // Переключение по кругу
    setCurrentIndex(nextIndex);
    setSelectedObject(objects[nextIndex]);
  };



  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
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
    <div className='App'>
      <h1>Тренировка концентрации</h1>



      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "20px"
      }}>
        <p style={{
          fontSize: "18px",
          color: "#666",
          marginBottom: "15px",
          fontWeight: "500"
        }}>
          Выбрать объект
        </p>

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
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            transition: "all 0.3s ease",
            fontWeight: "600",
            letterSpacing: "0.5px"
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          Выбрать объект
        </button>

        {selectedObject && (
          <div style={{
            fontSize: "180px",
            margin: "30px auto 20px auto",
            padding: "30px",
            // background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
            borderRadius: "30px",
            display: "inline-block",
            minWidth: "250px",
            minHeight: "250px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            textAlign: "center",
            lineHeight: "1.2",
            animation: "pop 0.3s ease",
            transition: "all 0.3s ease"
          }}>
            {selectedObject}
          </div>
        )}
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
          <button onClick={resetTimer}>
            🔄 Сброс
          </button>
        </div>
        <p>==============</p>
        <p> Количество отвлечений {count}</p>
        <button onClick={() => setCount(count + 1)}>Отвлекся</button>
        <button onClick={() => setCount(0)}>Сброс</button>
      </div>



    </div>


  )

}

export default App
