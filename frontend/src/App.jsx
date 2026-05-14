import { useState } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Reminder from "./pages/Reminder.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

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
              <button onClick={() => setCurrentPage("account")}>Account</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("signup")}>Sign Up</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage("login")}>
                Login
              </button>
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
      </header>

      <main>
        {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === "about" && <About />}
        {currentPage === "reminder" && <Reminder />}
        {currentPage === "signup" && <SignUp />}
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "account" && <Account />}
        {currentPage === "login" && <Login />}
      </main>
    </div>
  );
}

export default App;
