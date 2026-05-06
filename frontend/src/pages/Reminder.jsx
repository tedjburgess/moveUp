import { useEffect, useState } from "react";

function Reminder() {
  const [isMoving, setIsMoving] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finalDuration, setFinalDuration] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const maxSeconds = 10 * 60;

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

  const handleNo = () => {
    setFinalDuration(0);

    saveMovementResponse(0, "no");
  };

  const stopStopwatch = () => {
    setIsMoving(false);
    setFinalDuration(elapsedSeconds);

    saveMovementResponse(elapsedSeconds, "yes");
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

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}
    </section>
  );
}

export default Reminder;
