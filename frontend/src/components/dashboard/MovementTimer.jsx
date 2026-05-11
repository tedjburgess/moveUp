function MovementTimer({ secondsLeft, isTimerRunning, onStartTimer }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h3>Movement Timer</h3>
      <p>Next reminder in: {formatTime(secondsLeft)}</p>

      {!isTimerRunning && secondsLeft > 0 && (
        <button type="button" onClick={onStartTimer}>
          Start Reminder
        </button>
      )}

      {secondsLeft === 0 && (
        <button type="button" onClick={onStartTimer}>
          Start Again
        </button>
      )}
    </div>
  );
}

export default MovementTimer;
