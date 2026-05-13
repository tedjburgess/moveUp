import { useEffect, useState } from "react";
import MovementTimer from "../components/dashboard/MovementTimer.jsx";
import ReminderModal from "../components/dashboard/ReminderModal.jsx";
import ScoreStreakSummary from "../components/dashboard/ScoreStreakSummary.jsx";

const reminderIntervalSeconds = 10;
const testUserId = "6a01cca5c9be6b5ff3977eda";

function Dashboard() {
  const [secondsLeft, setSecondsLeft] = useState(reminderIntervalSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const [movementLogs, setMovementLogs] = useState([]);
  const [activityError, setActivityError] = useState("");

  const [userStats, setUserStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState("");

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

  const fetchUserStats = async () => {
    try {
      setStatsLoading(true);
      setStatsError("");

      const response = await fetch(
        `http://localhost:5000/api/users/${testUserId}/summary`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user stats");
      }

      const data = await response.json();
      setUserStats(data.user);
    } catch (error) {
      setStatsError(error.message);
    } finally {
      setStatsLoading(false);
    }
  };

  const refreshDashboardData = async () => {
    await fetchUserStats();
    await fetchMovementLogs();
  };

  useEffect(() => {
    refreshDashboardData();
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

      <ScoreStreakSummary
        userStats={userStats}
        isLoading={statsLoading}
        error={statsError}
      />

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
        <ReminderModal
          onClose={closeReminderModal}
          onMovementSaved={refreshDashboardData}
        />
      )}
    </section>
  );
}

export default Dashboard;
