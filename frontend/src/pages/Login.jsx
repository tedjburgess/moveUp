import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import API_BASE_URL from "../config/api.js";
import { useAuth } from "../context/AuthContext.jsx";

function Login({ onLoginSuccess }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      login({
        token: data.token,
        user: data.user,
      });

      setMessage("Login successful");

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 460, borderRadius: 4, boxShadow: 3 }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Login
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Log in to continue tracking your movement habits.
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
            />

            <Button type="submit" variant="contained" size="large">
              Login
            </Button>

            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
