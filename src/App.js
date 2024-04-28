import React, { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(1800);
  const [running, setRunning] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#7fffd4");
  const [pomodoroCount, setPomodoroCount] = useState(1);

  let correctTime =
    (time / 60 < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60)) +
    ":" +
    (time % 60 < 10 ? "0" + (time % 60) : time % 60);

  const changeBackgroundColor = () => {
    if (running) {
      setBackgroundColor("#7fffd4");
    } else {
      setBackgroundColor("#18a979");
    }
  };

  const handleClick = () => {
    changeBackgroundColor();
    if (time === 0) {
      setTime(1800);
      setPomodoroCount((prevCount) => prevCount + 1);
    }
    setRunning((running) => !running);
  };

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        if (time <= 1) {
          clearInterval(intervalId);
          setRunning(false);
        }
        setTime((prevTime) => prevTime - 1);
        let correctTime =
          ((time - 1) / 60 < 10
            ? "0" + Math.floor((time - 1) / 60)
            : Math.floor((time - 1) / 60)) +
          ":" +
          ((time - 1) % 60 < 10 ? "0" + ((time - 1) % 60) : (time - 1) % 60);
        document.title = correctTime + " - Work Is Fun";
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running, time]);

  useEffect(() => {
    // Update URL with pomodoro count
    const params = new URLSearchParams(window.location.search);
    params.set("pomodoros", pomodoroCount);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  }, [pomodoroCount]);

  return (
    <div
      className="text-4xl flex flex-col w-full h-screen justify-center items-center hover:bg-[#00000007] transition-colors"
      onClick={handleClick}
    >
      <div className="text-white font-bold mb-3 hover:text-[#f6f6f6] transition-colors">
        {correctTime}
      </div>
      <button
        onClick={(e) => {
          handleClick();
          e.stopPropagation();
        }}
        className={` font-bold  ${
          running ? "text-[#18a979]" : "text-[#7fffd4]"
        } bg-white rounded-full p-3 ${
          running ? "hover:text-[#7fffd4]" : "hover:text-[#18a979]"
        } transition-colors`}
      >
        {time === 0
          ? "Start Pomodoro? 🍅"
          : running
          ? "Stop Timer"
          : "Start Timer"}
      </button>

      <style>{`body { background-color: ${backgroundColor};  }`}</style>
    </div>
  );
}

export default App;
