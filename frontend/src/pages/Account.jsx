import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api.js";
import { useAuth } from "../context/AuthContext.jsx";

function Account() {
  const { user: authUser, token } = useAuth();
  const userId = authUser?.id || authUser?._id;

  const [user, setUser] = useState(null);
  const [reminderMode, setReminderMode] = useState("science");
  const [customReminderMinutes, setCustomReminderMinutes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [movementLogs, setMovementLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError, setLogsError] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setIsLoading(true);
        setLogsLoading(true);
        setLogsError("");
        setErrorMessage("");

        const response = await fetch(`${API_BASE_URL}/api/users/me/settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load account");
        }

        const data = await response.json();

        const statsResponse = await fetch(
          `${API_BASE_URL}/api/users/me/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!statsResponse.ok) {
          throw new Error("Failed to load user stats");
        }

        const statsData = await statsResponse.json();

        setUser({
          ...authUser,
          ...(statsData.user || {}),
        });
        setReminderMode(data.reminderMode || "science");
        setCustomReminderMinutes(data.customReminderMinutes || "");
        const logsResponse = await fetch(
          `${API_BASE_URL}/api/movement-logs/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!logsResponse.ok) {
          throw new Error("Failed to load movement logs");
        }

        const logsData = await logsResponse.json();
        setMovementLogs(logsData.slice(0, 3));
      } catch (error) {
        setErrorMessage("Could not load account information.");
        setLogsError("Could not load recent movement logs.");
      } finally {
        setIsLoading(false);
        setLogsLoading(false);
      }
    };

    if (token && authUser && userId) {
      fetchAccount();
    } else {
      setIsLoading(false);
      setErrorMessage("You need to be logged in to view this page.");
    }
  }, [token, authUser, userId]);

  const formatTime = (seconds = 0) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const response = await fetch(`${API_BASE_URL}/api/users/me/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reminderMode,
          customReminderMinutes:
            reminderMode === "custom" ? Number(customReminderMinutes) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save settings");
      }

      setReminderMode(data.reminderMode || "science");
      setCustomReminderMinutes(data.customReminderMinutes || "");
      setSuccessMessage("Reminder settings saved.");
    } catch (error) {
      setErrorMessage(error.message || "Could not save reminder settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section>
        <h2>Account</h2>
        <p>Loading account information...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section>
        <h2>Account</h2>
        <p>{errorMessage}</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Account</h2>

      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}

      <div>
        <h3>User Information</h3>
        <p>Username: {user.username || "Not available"}</p>
        <p>Email: {user.email || "Not available"}</p>
      </div>

      <div>
        <h3>Movement Stats</h3>
        <p>Total points: {user.totalPoints ?? 0}</p>
        <p>Current session streak: {user.currentSessionStreak ?? 0}</p>
        <p>Best session streak: {user.bestSessionStreak ?? 0}</p>
        <h3>Recent Movement Logs</h3>

        {logsLoading && <p>Loading recent movement logs...</p>}

        {logsError && <p>{logsError}</p>}

        {!logsLoading && !logsError && movementLogs.length === 0 && (
          <p>No recent movement logs found.</p>
        )}

        {!logsLoading && !logsError && movementLogs.length > 0 && (
          <ul>
            {movementLogs.map((log) => (
              <li key={log._id}>
                Response: {log.responseType || (log.moved ? "yes" : "no")} |
                Duration: {formatTime(log.durationSeconds)} | Points:{" "}
                {log.pointsEarned} | Created:{" "}
                {new Date(log.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Reminder Settings</h3>

        <div>
          <label>
            <input
              type="radio"
              name="reminderMode"
              value="science"
              checked={reminderMode === "science"}
              onChange={(event) => setReminderMode(event.target.value)}
            />
            Science-informed default mode
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="reminderMode"
              value="custom"
              checked={reminderMode === "custom"}
              onChange={(event) => setReminderMode(event.target.value)}
            />
            Custom interval mode
          </label>
        </div>

        {reminderMode === "custom" && (
          <div>
            <label htmlFor="customReminderMinutes">
              Custom reminder minutes:
            </label>
            <input
              id="customReminderMinutes"
              type="number"
              min="1"
              max="60"
              value={customReminderMinutes}
              onChange={(event) => setCustomReminderMinutes(event.target.value)}
            />
          </div>
        )}

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Reminder Settings"}
        </button>
      </form>
    </section>
  );
}

export default Account;
