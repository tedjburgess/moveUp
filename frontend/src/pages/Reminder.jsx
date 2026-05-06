import { useEffect, useState } from "react";

function Reminder() {
  const [isMoving, setIsMoving] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finalDuration, setFinalDuration] = useState(null);

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

  const startStopwatch = () => {
    setElapsedSeconds(0);
    setFinalDuration(null);
    setIsMoving(true);
  };

  const stopStopwatch = () => {
    setIsMoving(false);
    setFinalDuration(elapsedSeconds);
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
    </section>
  );
}

export default Reminder;
