import { useEffect, useState } from "react";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/users/leaderboard"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>

      {isLoading && <p>Loading leaderboard...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && users.length === 0 && (
        <p>No leaderboard users found.</p>
      )}

      {!isLoading && !error && users.length > 0 && (
        <ol>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.username}</strong> — {user.totalPoints} points
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
