import { useEffect, useState } from "react";
import MovementTimer from "../components/dashboard/MovementTimer.jsx";
import ReminderModal from "../components/dashboard/ReminderModal.jsx";
import ScoreStreakSummary from "../components/dashboard/ScoreStreakSummary.jsx";

const reminderIntervalSeconds = 10;
const testUserId = "69fbb7a5931013d605271be7";

function Dashboard() {
  const [secondsLeft, setSecondsLeft] = useState(reminderIntervalSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [movementLogs, setMovementLogs] = useState([]);
  const [activityError, setActivityError] = useState("");

  useEffect(() => {
    const fetchMovementLogs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movement-logs/user/${testUserId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movement logs");
        }

        const data = await response.json();
        setMovementLogs(data);
        setActivityError("");
      } catch (error) {
        setActivityError("Could not load recent activity.");
      }
    };

    fetchMovementLogs();
  }, []);

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

        {activityError && <p>{activityError}</p>}

        {!activityError && movementLogs.length === 0 && (
          <p>No recent activity yet.</p>
        )}

        {!activityError && movementLogs.length > 0 && (
          <ul>
            {movementLogs.slice(0, 5).map((log) => (
              <li key={log._id}>
                <strong>{log.responseType}</strong> —{" "}
                {log.moved ? `${log.durationSeconds} seconds` : "0 seconds"} —{" "}
                {log.pointsEarned} points
              </li>
            ))}
          </ul>
        )}
      </div>

      {isReminderModalOpen && <ReminderModal onClose={closeReminderModal} />}
    </section>
  );
}

export default Dashboard;
