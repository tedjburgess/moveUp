# moveUp

A fullstack Movement Reminder / Activity Streak web application.

The app will encourage users to get up and move after a certain amount of time. Users will be able to respond to reminders, earn points, build streaks, and compare scores on a leaderboard.

## Tech stack

- React
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