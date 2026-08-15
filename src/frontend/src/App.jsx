import { useState, useEffect } from "react"

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const passed_time = 0;

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      // Если таймер остановлен - очищаем интервал
      clearInterval(interval);
    }

    // Очистка при размонтировании
    return () => clearInterval(interval);
  }, [isRunning]); // Зависит от isRunning

  // Функции управления
  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };


  useEffect(() => {
    const savedCount = localStorage.getItem('clickCount');
    if (savedCount !== null) {
      setCount(Number(savedCount));
    }
  }, []);



  return (
    <div className='App'>
      <h1>Тренировка концентрации</h1>
      <p>Начать</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '⏸️ Пауза' : '▶️ Старт'}
      </button>
      <p>Времени прошло: {seconds}</p>
      <p> Количество отвлечений {count}</p>
      <button onClick={() => setCount(count + 1)}>Отвлекся</button>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>⏱️ Таймер</h1>

        <div style={{ fontSize: "48px", margin: "20px" }}>
          {seconds} сек.
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
      </div>



    </div>


  )

}

export default App
