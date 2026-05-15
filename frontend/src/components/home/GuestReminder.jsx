import { useEffect, useState } from "react";

function GuestReminder() {
  const [isMoving, setIsMoving] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finalDuration, setFinalDuration] = useState(null);

  useEffect(() => {
    if (!isMoving) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isMoving]);

  const startGuestMovement = () => {
    setElapsedSeconds(0);
    setFinalDuration(null);
    setIsMoving(true);
  };

  const stopGuestMovement = () => {
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
      <h3>Try a Move Up</h3>
      <p>
        This guest timer does not save points, streaks, or movement logs. Sign
        up now to unlock these features!
      </p>

      {!isMoving && (
        <button type="button" onClick={startGuestMovement}>
          Start Guest Movement
        </button>
      )}

      {isMoving && (
        <>
          <p>Time elapsed: {formatTime(elapsedSeconds)}</p>
          <button type="button" onClick={stopGuestMovement}>
            I'm back
          </button>
        </>
      )}

      {finalDuration !== null && (
        <p>Guest movement duration: {formatTime(finalDuration)}</p>
      )}
    </section>
  );
}

export default GuestReminder;
