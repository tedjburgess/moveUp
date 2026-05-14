# MoveUp

MoveUp is a fullstack Movement Reminder / Activity Streak web application. The app helps users build healthier habits while spending long periods of time at a computer.

Users can receive reminders to take short movement breaks, confirm completed breaks, earn points, build streaks, and compare their progress on a leaderboard.

## Tech Stack

### Frontend

- React
- JavaScript
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

## Project structure

```txt
frontend/
  src/
    components/   Reusable React components
    pages/        Page-level React views

backend/
  src/
    app.js        Express app setup
    server.js     Starts the backend server
    config/       Database and app configuration
    controllers/  Request handling logic
    routes/       API route definitions
    models/       Mongoose schemas and models
    middleware/   Express middleware
```

## Group Members

- Osayi Uwadiae
- Ted J. Burgess
- Mhd Osama Alsaheb
- Ralph Tolentino Ariza

## Current Checkpoint

The current checkpoint focuses on building the frontend reminder flow, connecting the frontend to the backend API, saving movement responses to MongoDB, and documenting how to run the project locally.

## Planned Core Features

- User registration and login
- Movement break reminders with stopwatch tracking
- Break confirmation with Yes/No response flow
- Points system
- Activity streaks
- User statistics
- Leaderboard
- Responsive design

## Data Flow

The user interacts with the frontend built in React. The frontend sends requests to the backend API using HTTP requests. The backend, built with Node.js and Express, handles the logic for users, reminders, points, streaks, and leaderboard data. The backend communicates with MongoDB through Mongoose to store and retrieve data.

## Movement Reminder Flow

The Reminder page simulates a movement break prompt.

- Clicking **Yes** starts a stopwatch.
- Clicking **I'm back** stops the stopwatch and saves the movement duration.
- Clicking **No** saves a movement response with 0 seconds.
- Movement duration is capped at 10 minutes.
- Responses are sent to the backend API and stored in MongoDB.

## Frontend & Backend Setup Instructions

The root script is configured using concurrently, allowing both frontend and backend to run together.

Run the application from the root folder:

```bash
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Checkpoint 3 Flow

The Dashboard contains a movement timer that reminds the user to take a break. When the timer reaches zero, a reminder modal opens and asks the user to confirm whether they moved.

If the user clicks **Yes**, the app tracks the movement duration and sends the response to the backend. The backend caps the credited movement time at 600 seconds, calculates points as 1 point per full credited minute, saves the movement log, and updates the user's total points and session streak.

If the user clicks **No**, the app saves a movement response with 0 seconds and 0 points, and the current session streak is reset. Timeout or missed movement responses should also be treated as no movement for the current checkpoint flow.

Recent movement activity can be fetched from the backend so the dashboard can show the latest movement responses, including response type, duration, and points earned.

The leaderboard is based on user data, not a separate leaderboard model. Users are ranked by `totalPoints`, with usernames and current streak data shown where available.

## Local Testing for Checkpoint 3

Start the app from the project root:

```bash
npm install
npm run dev

Frontend:

http://localhost:5173

Backend:

http://localhost:5000

Create a local backend .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string_here

Do not commit the real .env file.

Useful backend checks:

curl http://localhost:5000/api/health

Fetch recent movement logs for a user:

curl http://localhost:5000/api/movement-logs/user/USER_ID_HERE

Create a movement log:

curl -X POST http://localhost:5000/api/movement-logs -H "Content-Type: application/json" -d "{\"userId\":\"USER_ID_HERE\",\"moved\":true,\"durationSeconds\":120}"

Expected result: the saved movement log includes durationSeconds, creditedSeconds, and pointsEarned.
```

## Checkpoint 4 Technical Decisions

During Checkpoint 4, the project started adding authentication and account-related features. The goal is to move from hardcoded test users toward a logged-in user flow, while still keeping the app simple enough for the current checkpoint.

### Database and Mongoose

MongoDB is used because the project needs to store users, movement logs, reminder settings, points, and streak data. Mongoose is used on the backend to define schemas for this data and to make database access easier to organize in the Express controllers.

### Authentication Approach

The project is moving toward JWT-based authentication. JWTs allow the backend to identify the logged-in user when protected routes are called. This is useful for account pages, reminder settings, movement logs, and future features where users should only access their own data.

Some frontend pages may still use a temporary test user while the full login flow is being connected. This is treated as guest/test mode. Logged-in mode should use the authenticated user's ID from the backend instead of trusting a user ID sent manually from the frontend.

### Backend Folder Structure

The backend is split into separate folders to keep the code easier to maintain:

- `models/` defines MongoDB/Mongoose schemas.
- `routes/` defines the API endpoints.
- `controllers/` contains request and response logic.
- `middleware/` contains reusable Express middleware, such as authentication checks.
- `config/` contains setup code such as database connection logic.

This structure keeps route files small and puts most business logic in controllers.

### Leaderboard Decision

The leaderboard is calculated from existing user data instead of being stored in a separate leaderboard collection. Users are ranked by `totalPoints`, and the response can include fields such as `username`, `currentSessionStreak`, and `bestSessionStreak`.

This avoids duplicate data and keeps the leaderboard in sync with the user records.

### Account and Reminder Settings

The Account page is intended to show basic user information such as username, email, total points, and current streak. It is also where reminder settings belong.

Reminder settings include a science-informed default mode and a custom interval mode. The wording avoids strong medical claims and keeps the feature focused on helpful movement reminders.

### Alternatives Considered

A separate leaderboard model was considered, but it would create duplicate data that could become outdated. Storing reminder settings in a separate settings model was also considered, but for this stage it is simpler to keep basic reminder preferences on the user document.
