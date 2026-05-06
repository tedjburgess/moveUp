import { useEffect, useState } from "react";

function Reminder() {
  const [isMoving, setIsMoving] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finalDuration, setFinalDuration] = useState(null);
  const [movementLogs, setMovementLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [logsError, setLogsError] = useState("");

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

  const startStopwatch = () => {
    setElapsedSeconds(0);
    setFinalDuration(null);
    setIsMoving(true);
  };

  const stopStopwatch = () => {
    setIsMoving(false);
    setFinalDuration(elapsedSeconds);
    fetchMovementLogs();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <section>
      <h2>It's time to move!</h2>
      <p>Take a short break and move your body.</p>

      {!isMoving && <button onClick={startStopwatch}>Yes</button>}
      {!isMoving && <button>No</button>}

      {isMoving && (
        <>
          <p>Time Elapsed: {formatTime(elapsedSeconds)}</p>
          <button onClick={stopStopwatch}>I'm back</button>
        </>
      )}

      {elapsedSeconds >= maxSeconds && <p>10 minute break is over!</p>}

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
    </section>
  );
}

export default Reminder;