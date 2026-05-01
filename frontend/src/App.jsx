import { useState } from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header>
        <h1>Movement Reminder</h1>

        <nav>
          <button onClick={() => setCurrentPage("home")}>Home</button>
          <button onClick={() => setCurrentPage("about")}>About</button>
        </nav>
      </header>

      <main>
        {currentPage === "home" && <Home />}
        {currentPage === "about" && <About />}
      </main>
    </div>
  );
}

export default App;