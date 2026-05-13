import { useEffect, useState } from "react";

const testUserId = "6a01cca5c9be6b5ff3977ed9";

function Account() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        const userId = storedUserId || testUserId;

        const response = await fetch(
          `http://localhost:5000/api/users/${userId}/summary`,
        );

        if (!response.ok) {
          throw new Error("Failed to load account");
        }

        const data = await response.json();
        setUser(data.user);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Could not load account information.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccount();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h2>Account</h2>
        <p>Loading account information...</p>
      </section>
    );
  }

  if (errorMessage) {
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
    </section>
  );
}

export default Account;
