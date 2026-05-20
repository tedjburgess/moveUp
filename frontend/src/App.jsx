import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
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
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setCurrentPage("home");
  };

  const navButtonStyles = {
    fontSize: { xs: "0.7rem", sm: "0.875rem" },
    minWidth: "auto",
    px: { xs: 0.7, sm: 1 },
    whiteSpace: "nowrap",
  };

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
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            gap: 2,
            py: { xs: 2, md: 1 },
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              cursor: "pointer",
              textAlign: { xs: "center", md: "left" },
            }}
            onClick={() => setCurrentPage("home")}
          >
            MoveUp
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1 }}
            useFlexGap
            sx={{
              width: { xs: "100%", md: "auto" },
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-end" },
              rowGap: 1,
            }}
          >
            <Button sx={navButtonStyles} onClick={() => setCurrentPage("home")}>
              Home
            </Button>

            <Button
              sx={navButtonStyles}
              onClick={() => setCurrentPage("leaderboard")}
            >
              Leaderboard
            </Button>

            <Button
              sx={navButtonStyles}
              onClick={() => setCurrentPage("about")}
            >
              About
            </Button>

            {isLoggedIn && (
              <>
                <Button
                  sx={navButtonStyles}
                  onClick={() => setCurrentPage("dashboard")}
                >
                  Dashboard
                </Button>

                <Button
                  sx={navButtonStyles}
                  onClick={() => setCurrentPage("account")}
                >
                  Account
                </Button>

                <Button
                  sx={navButtonStyles}
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Button
                  sx={navButtonStyles}
                  onClick={() => setCurrentPage("login")}
                >
                  Login
                </Button>

                <Button
                  sx={navButtonStyles}
                  variant="contained"
                  onClick={() => setCurrentPage("signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          py: { xs: 3, md: 4 },
          px: { xs: 2, sm: 3 },
          flex: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            overflowX: "auto",
          }}
        >
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
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e0e0e0",
          mt: "auto",
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
