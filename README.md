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
