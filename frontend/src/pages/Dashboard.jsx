import { useEffect, useState } from "react";

function Dashboard() {
  const reminderIntervalSeconds = 10;

  const [secondsLeft, setSecondsLeft] = useState(reminderIntervalSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (!isTimerRunning || secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((currentSeconds) => currentSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, secondsLeft]);

  const startTimer = () => {
    setSecondsLeft(reminderIntervalSeconds);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <section>
      <h2>Dashboard</h2>

      <div>
        <h3>Movement Timer</h3>

        <p>Next reminder in: {formatTime(secondsLeft)}</p>

        {!isTimerRunning && secondsLeft > 0 && (
          <button onClick={startTimer}>Start Reminder</button>
        )}

        {secondsLeft === 0 && (
          <>
            <p>It is time to move!</p>
            <button onClick={startTimer}>Start Again</button>
          </>
        )}
      </div>

      <div>
        <h3>Score / Streak</h3>
        <p>Points: 0</p>
        <p>Current streak: 0</p>
        <p>Best session streak: 0</p>
      </div>

      <div>
        <h3>Recent Activity</h3>
        <p>No recent activity yet.</p>
      </div>
    </section>
  );
}

export default Dashboard;
