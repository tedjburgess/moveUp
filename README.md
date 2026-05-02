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

The current checkpoint focuses on setting up the project structure, creating the frontend and backend folders, connecting the basic app setup, and writing documentation that explains how to run the project.

## Planned Core Features

- User registration and login
- Movement break reminders
- Break confirmation
- Points system
- Activity streaks
- User statistics
- Leaderboard
- Responsive design

## Data Flow

The user interacts with the frontend built in React. The frontend sends requests to the backend API using HTTP requests. The backend, built with Node.js and Express, handles the logic for users, reminders, points, streaks, and leaderboard data. The backend communicates with MongoDB through Mongoose to store and retrieve data.


## Frontend Setup Instructions


```bash
1. Navigate to the frontend folder:

cd frontend

2. Install dependencies:

npm install

3. Start the frontend development server:

npm run dev

4. Open your browser and go to:

http://localhost:5173


## Backend Setup Instructions

1. Navigate to the backend folder:

cd backend

2. Install dependencies:

npm install

3. Create a `.env` file inside the `backend` folder and add the following:

PORT=5000  
MONGODB_URI=your_mongodb_connection_string

4. Start the backend server:

npm run dev

If `npm run dev` does not work, use:

npm start

5. Verify that the backend is running by opening:

http://localhost:5000/api/health


## Run Frontend and Backend Together

If a root script using concurrently is configured, you can run both frontend and backend with one command:

npm run dev
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string