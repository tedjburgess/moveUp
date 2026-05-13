import { useState } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Reminder from "./pages/Reminder.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header>
        <h1>MoveUp</h1>

        <nav>
          <ul>
            <li>
              <button onClick={() => setCurrentPage("home")}>Home</button>
            </li>
            <li>
              <button>Leaderboard</button>
            </li>
            <li>
              <button>Account</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("signup")}>Sign Up</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("about")}>About</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("reminder")}>
                Reminder
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("dashboard")}>
                Dashboard
              </button>
            </li>
          </ul>
        </nav>

        {isLoggedIn ? (
          <>
            <p>Logged in as {user.username}</p>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <p>Not logged in</p>
        )}
      </header>

      <main>
        {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === "about" && <About />}
        {currentPage === "reminder" && <Reminder />}
        {currentPage === "signup" && <SignUp />}
        {currentPage === "dashboard" && <Dashboard />}
      </main>
    </div>
  );
}

export default App;
