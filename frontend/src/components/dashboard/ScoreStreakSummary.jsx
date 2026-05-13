function ScoreStreakSummary({ userStats, isLoading, error }) {
  return (
    <div>
      <h3>Score / Streak</h3>

      {isLoading && <p>Loading stats...</p>}

      {error && <p>{error}</p>}

      {userStats && (
        <>
          <p>Total points: {userStats.totalPoints}</p>

          <p>Current streak: {userStats.currentSessionStreak}</p>

          <p>Best session streak: {userStats.bestSessionStreak}</p>
        </>
      )}
    </div>
  );
}

export default ScoreStreakSummary;
