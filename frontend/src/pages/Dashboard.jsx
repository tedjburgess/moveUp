import { useEffect, useState } from "react";
import MovementTimer from "../components/dashboard/MovementTimer.jsx";
import ReminderModal from "../components/dashboard/ReminderModal.jsx";
import ScoreStreakSummary from "../components/dashboard/ScoreStreakSummary.jsx";

const reminderIntervalSeconds = 10;

function Dashboard() {
  const [secondsLeft, setSecondsLeft] = useState(reminderIntervalSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  useEffect(() => {
    if (!isTimerRunning || secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((currentSeconds) => {
        if (currentSeconds <= 1) {
          setIsTimerRunning(false);
          setIsReminderModalOpen(true);
          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, secondsLeft]);

  const startTimer = () => {
    setSecondsLeft(reminderIntervalSeconds);
    setIsReminderModalOpen(false);
    setIsTimerRunning(true);
  };

  const closeReminderModal = () => {
    setIsReminderModalOpen(false);
  };

  return (
    <section>
      <h2>Dashboard</h2>

      <MovementTimer
        secondsLeft={secondsLeft}
        isTimerRunning={isTimerRunning}
        onStartTimer={startTimer}
      />

      <ScoreStreakSummary />

      <div>
        <h3>Recent Activity</h3>
        <p>No recent activity yet.</p>
      </div>

      {isReminderModalOpen && <ReminderModal onClose={closeReminderModal} />}
    </section>
  );
}

export default Dashboard;
