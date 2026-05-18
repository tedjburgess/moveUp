import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api.js";

const testUserId = "6a01cca5c9be6b5ff3977ed9";

function Account() {
  const [user, setUser] = useState(null);
  const [reminderMode, setReminderMode] = useState("science");
  const [customReminderMinutes, setCustomReminderMinutes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getCurrentUserId = () => {
    return localStorage.getItem("userId") || testUserId;
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const userId = getCurrentUserId();

        const response = await fetch(
          `${API_BASE_URL}/api/users/${userId}/summary`
        );

        if (!response.ok) {
          throw new Error("Failed to load account");
        }

        const data = await response.json();

        setUser(data.user);
        setReminderMode(data.user.reminderMode || "science");
        setCustomReminderMinutes(data.user.customReminderMinutes || "");
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Could not load account information.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setSuccessMessage("");
      setErrorMessage("");

      const userId = getCurrentUserId();

      const response = await fetch(
        `${API_BASE_URL}/api/users/${userId}/reminder-settings`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reminderMode,
            customReminderMinutes:
              reminderMode === "custom" ? customReminderMinutes : null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      const data = await response.json();

      setUser(data.user);
      setReminderMode(data.user.reminderMode || "science");
      setCustomReminderMinutes(data.user.customReminderMinutes || "");
      setSuccessMessage("Reminder settings saved.");
    } catch (error) {
      setErrorMessage("Could not save reminder settings.");
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
