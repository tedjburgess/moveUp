import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api.js";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/api/users/leaderboard`);

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
    <Box>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Leaderboard
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        See the top MoveUp users ranked by total points.
      </Typography>

      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          {isLoading && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CircularProgress size={24} />
              <Typography>Loading leaderboard...</Typography>
            </Box>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!isLoading && !error && users.length === 0 && (
            <Alert severity="info">No leaderboard users found.</Alert>
          )}

          {!isLoading && !error && users.length > 0 && (
            <List>
              {users.map((user, index) => (
                <ListItem
                  key={user._id}
                  divider={index !== users.length - 1}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography component="span" fontWeight="bold">
                        #{index + 1} {user.username}
                      </Typography>
                    }
                    secondary={`${user.totalPoints} points`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Leaderboard;
