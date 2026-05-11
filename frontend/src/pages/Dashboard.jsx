import { useEffect, useState } from "react";
import Reminder from "./Reminder.jsx";

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
          <button type="button" onClick={startTimer}>
            Start Reminder
          </button>
        )}

        {secondsLeft === 0 && (
          <button type="button" onClick={startTimer}>
            Start Again
          </button>
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

      {isReminderModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <Reminder onClose={closeReminderModal} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
