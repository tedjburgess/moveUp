import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";

function About() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            About MoveUp
          </Typography>

          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Movement Reminder Application
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Group 17
            </Typography>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Team Members
            </Typography>

            <List>
              <ListItem>Mhd Osama Alsaheb — Focus area: placeholder</ListItem>

              <ListItem>Ted J. Burgess — Focus area: placeholder</ListItem>

              <ListItem>
                Ralph Tolentino Ariza — Focus area: placeholder
              </ListItem>

              <ListItem>Osayi Uwadiae — Focus area: placeholder</ListItem>
            </List>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              App Purpose
            </Typography>

            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              MoveUp is a fullstack web application aimed at helping people
              build better habits when they spend a lot of time at their
              computers. The idea is to remind users to take short breaks at
              regular intervals and encourage them to actually get up and move
              around.
            </Typography>

            <Typography color="text.secondary" sx={{ lineHeight: 1.8, mt: 2 }}>
              When users confirm that they have taken a break, they can earn
              points, build streaks, and see how they compare with others on a
              leaderboard. The goal is to make something that is not only
              useful, but also a bit motivating and fun to use.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Planned Core Features
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography fontWeight="bold" gutterBottom>
                      User Accounts
                    </Typography>

                    <Typography color="text.secondary">
                      Users can create accounts and log in securely.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography fontWeight="bold" gutterBottom>
                      Statistics
                    </Typography>

                    <Typography color="text.secondary">
                      Track completed breaks, streaks, and leaderboard position.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography fontWeight="bold" gutterBottom>
                      Reminder System
                    </Typography>

                    <Typography color="text.secondary">
                      Receive reminders to take movement breaks regularly.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography fontWeight="bold" gutterBottom>
                      Leaderboard
                    </Typography>

                    <Typography color="text.secondary">
                      Compare total points and rankings with other users.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default About;
