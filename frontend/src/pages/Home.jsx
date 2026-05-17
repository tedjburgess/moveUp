import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import GuestReminder from "../components/home/GuestReminder.jsx";

function Home({ setCurrentPage }) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fb",
        padding: 4,
      }}
    >
      <Card
        sx={{ maxWidth: 760, width: "100%", borderRadius: 4, boxShadow: 4 }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to MoveUp
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Build healthier movement habits with reminders and movement
            tracking.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => setCurrentPage("signup")}
            sx={{ mb: 4, borderRadius: 3 }}
          >
            Sign Up Now
          </Button>

          <GuestReminder />
        </CardContent>
      </Card>
    </Box>
  );
}

export default Home;
