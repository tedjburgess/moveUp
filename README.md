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

## Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string