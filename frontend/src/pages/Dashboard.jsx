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
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              marginBottom: "10px",
              color: "#111827",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Track your movement habits and improve your daily activity.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Movement Timer
            </h2>

            <MovementTimer
              secondsLeft={secondsLeft}
              isTimerRunning={isTimerRunning}
              onStartTimer={startTimer}
            />
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Statistics
            </h2>

            <ScoreStreakSummary
              userStats={userStats}
              isLoading={statsLoading}
              error={statsError}
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            Recent Activity
          </h2>

          {activityError && <p style={{ color: "red" }}>{activityError}</p>}

          {!activityError && movementLogs.length === 0 && (
            <p
              style={{
                color: "#6b7280",
              }}
            >
              No recent activity yet.
            </p>
          )}

          {!activityError && movementLogs.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {movementLogs.slice(0, 5).map((log) => (
                <div
                  key={log._id}
                  style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div>
                    <strong>{log.responseType}</strong>
                  </div>

                  <div
                    style={{
                      color: "#374151",
                    }}
                  >
                    {log.moved ? `${log.durationSeconds} seconds` : "0 seconds"}
                  </div>

                  <div
                    style={{
                      fontWeight: "bold",
                      color: "#2563eb",
                    }}
                  >
                    {log.pointsEarned} pts
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isReminderModalOpen && (
          <ReminderModal
            onClose={closeReminderModal}
            onMovementSaved={refreshDashboardData}
          />
        )}
      </div>
    </section>
  );
}

export default Dashboard;
