import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api.js";
import { useAuth } from "../context/AuthContext.jsx";

function Reminder({ onClose, onMovementSaved }) {
  const { user, token } = useAuth();
  const userId = user?.id || user?._id;

  const [isMoving, setIsMoving] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finalDuration, setFinalDuration] = useState(null);

  const [movementLogs, setMovementLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [logsError, setLogsError] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const maxSeconds = 10 * 60;

  const fetchMovementLogs = async () => {
    try {
      setLogsLoading(true);
      setLogsError("");

      const response = await fetch(`${API_BASE_URL}/api/movement-logs/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movement logs");
      }

      const data = await response.json();
      setMovementLogs(data);
    } catch (error) {
      setLogsError(error.message);
    } finally {
      setLogsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovementLogs();
  }, []);

  useEffect(() => {
    if (!isMoving) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((seconds) => {
        if (seconds >= maxSeconds) {
          setIsMoving(false);
          setFinalDuration(maxSeconds);
          return maxSeconds;
        }

        return seconds + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMoving]);

  useEffect(() => {
    if (!onClose) {
      return;
    }

    const timeout = setTimeout(
      async () => {
        await saveMovementResponse(0, "timeout");

        await fetchMovementLogs();

        if (onMovementSaved) {
          onMovementSaved();
        }

        onClose();
      },
      5 * 60 * 1000
    );

    return () => clearTimeout(timeout);
  }, [onClose]);

  const saveMovementResponse = async (durationSeconds, responseType) => {
    if (!userId) {
      setError("No logged-in user found.");
      return null;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/movement-logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          responseType,
          durationSeconds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save movement response");
      }

      const data = await response.json();

      setMessage("Movement response saved.");

      if (onMovementSaved) {
        onMovementSaved();
      }
      return data;
    } catch (err) {
      setError("Could not save movement response.");
      return null;
    }
  };

  const startStopwatch = () => {
    setElapsedSeconds(0);
    setFinalDuration(null);
    setMessage("");
    setError("");
    setIsMoving(true);
  };

  const handleNo = async () => {
    setFinalDuration(0);

    await saveMovementResponse(0, "no");
    await fetchMovementLogs();

    if (onClose) {
      onClose();
    }
  };

  const stopStopwatch = async () => {
    setIsMoving(false);
    setFinalDuration(elapsedSeconds);

    await saveMovementResponse(elapsedSeconds, "yes");
    fetchMovementLogs();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <section style={{ position: "relative" }}>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          X
        </button>
      )}

      <h2>It's time to move!</h2>

      <p>Take a short break and move your body.</p>

      {!isMoving && (
        <>
          <button onClick={startStopwatch}>Yes</button>

          <button onClick={handleNo}>No</button>
        </>
      )}

      {isMoving && (
        <>
          <p>Time Elapsed: {formatTime(elapsedSeconds)}</p>

          <button onClick={stopStopwatch}>I'm back</button>
        </>
      )}

      {elapsedSeconds >= maxSeconds && <p>10 minute break is finished!</p>}

      {finalDuration !== null && (
        <p>Final duration: {formatTime(finalDuration)}</p>
      )}

      <hr />

      <h3>Recent Movement Logs</h3>
      <button onClick={fetchMovementLogs}>Refresh logs</button>

      {logsLoading && <p>Loading movement logs...</p>}

      {logsError && <p>{logsError}</p>}

      {!logsLoading && !logsError && movementLogs.length === 0 && (
        <p>No movement logs found.</p>
      )}

      {!logsLoading && !logsError && movementLogs.length > 0 && (
        <ul>
          {movementLogs.map((log) => (
            <li key={log._id}>
              <strong>Moved:</strong> {log.moved ? "Yes" : "No"} |{" "}
              <strong>Duration:</strong> {formatTime(log.durationSeconds)} |{" "}
              <strong>Points:</strong> {log.pointsEarned} |{" "}
              <strong>Created:</strong>{" "}
              {new Date(log.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}
    </section>
  );
}

export default Reminder;
