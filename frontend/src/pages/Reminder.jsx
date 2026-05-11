import { useEffect, useState } from "react";

function Reminder({ onClose }) {
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

      const response = await fetch("http://localhost:5000/api/movement-log");

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

  const saveMovementResponse = async (durationSeconds, responseType) => {
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/movement-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          durationSeconds,
          responseType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save movement response");
      }

      setMessage("Movement response saved.");
    } catch (err) {
      setError("Could not save movement response.");
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

  const stopStopwatch = () => {
    setIsMoving(false);
    setFinalDuration(elapsedSeconds);

    saveMovementResponse(elapsedSeconds, "yes");
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
          {movementLogs
            .filter((log) => log.moved)
            .map((log) => (
              <li key={log._id}>
                <strong>Moved:</strong> {log.moved ? "Yes" : "No"} |{" "}
                <strong>Duration:</strong> {formatTime(log.durationSeconds)} |{" "}
                <strong>Points:</strong> {log.pointsEarned}
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
