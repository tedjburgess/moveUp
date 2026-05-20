import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import ProtectedPage from "./components/auth/ProtectedPage.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ cursor: "pointer" }}
            onClick={() => setCurrentPage("home")}
          >
            MoveUp
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button onClick={() => setCurrentPage("home")}>Home</Button>

            <Button onClick={() => setCurrentPage("leaderboard")}>
              Leaderboard
            </Button>

            <Button onClick={() => setCurrentPage("about")}>About</Button>

            {isLoggedIn && (
              <>
                <Button onClick={() => setCurrentPage("dashboard")}>
                  Dashboard
                </Button>

                <Button onClick={() => setCurrentPage("account")}>
                  Account
                </Button>

                <Button color="error" onClick={logout}>
                  Logout
                </Button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Button onClick={() => setCurrentPage("login")}>Login</Button>

                <Button
                  variant="contained"
                  onClick={() => setCurrentPage("signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === "about" && <About />}
        {currentPage === "signup" && <SignUp />}

        {currentPage === "dashboard" && (
          <ProtectedPage
            pageName="Dashboard"
            onGoHome={() => setCurrentPage("home")}
          >
            <Dashboard />
          </ProtectedPage>
        )}

        {currentPage === "account" && (
          <ProtectedPage
            pageName="Account"
            onGoHome={() => setCurrentPage("home")}
          >
            <Account />
          </ProtectedPage>
        )}

        {currentPage === "login" && (
          <Login onLoginSuccess={() => setCurrentPage("dashboard")} />
        )}
        {currentPage === "leaderboard" && <Leaderboard />}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2026 MoveUp. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
