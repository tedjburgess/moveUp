# MoveUp

MoveUp is a fullstack Movement Reminder / Activity Streak web application. The app helps users build healthier habits while spending long periods of time at a computer.

Users can receive reminders to take short movement breaks, confirm completed breaks, earn points, build streaks, and compare progress on a leaderboard.

## Deployed App

- Frontend: https://cute-crisp-d4f482.netlify.app/
- Backend API: Not added yet
- Backend health route: Not added yet

The backend deployment link will be added once the deployed API URL is confirmed.

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT authentication

## Project Structure

````txt
frontend/
  src/
    components/     Reusable React components
    pages/          Page-level React views
    context/        Auth context
    config/         Frontend API config

backend/
  src/
    app.js          Express app setup
    server.js       Starts the backend server
    config/         Database configuration
    controllers/    Request handling logic
    routes/         API route definitions
    models/         Mongoose schemas and models
    middleware/     Express middleware such as auth
Core Features
User signup and login
Protected dashboard for logged-in users
Guest timer mode
Movement reminder modal
Yes / No / timeout movement responses
Stopwatch for completed movement breaks
Points and session streaks
Leaderboard based on real user scores
Account page with user information and reminder settings
MongoDB Atlas database storage
Data Flow

The user interacts with the React frontend. The frontend sends HTTP requests to the Express backend API. The backend validates requests, runs controller logic, and reads or writes data using Mongoose models. MongoDB Atlas stores users, movement logs, points, streaks, and reminder settings.

Example flow:

React frontend → Express route → Controller → Mongoose model → MongoDB Atlas
Movement Reminder Flow

The dashboard contains the main movement reminder flow.

The user starts the reminder timer.
When the timer finishes, a reminder modal opens.
If the user clicks Yes, the stopwatch starts.
When the user clicks I'm back, the duration is saved.
If the user clicks No, a no-movement response is saved.
If the user does not answer in time, a timeout response is saved.
The backend updates movement logs, points, and streaks.

Movement duration is capped at 600 credited seconds for points.

Local Setup

Clone the repository:

git clone https://github.com/tedjburgess/moveUp.git
cd moveUp

Install dependencies:

npm install
cd frontend
npm install
cd ../backend
npm install
cd ..

Create a backend environment file:

touch backend/.env

Add local environment variables to backend/.env:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_local_jwt_secret
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173

Do not commit real secrets, passwords, JWT secrets, or MongoDB connection strings.

Start the project from the root folder:

npm run dev

Local URLs:

Frontend: http://localhost:5173
Backend:  http://localhost:5000
Useful Local API Checks

Health check:

curl http://localhost:5000/api/health

Login:

curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"user@example.com\",\"password\":\"password123\"}"

Leaderboard:

curl http://localhost:5000/api/users/leaderboard
Environment Variables

Required backend environment variables:

Variable	Purpose
PORT	Local backend port
MONGO_URI	MongoDB Atlas connection string
JWT_SECRET	Secret used to sign JWT tokens
CLIENT_URL	Allowed local/deployed frontend URL for CORS
FRONTEND_URL	Allowed local/deployed frontend URL for CORS

Required frontend environment variables:

Variable	Purpose
VITE_API_BASE_URL	Backend API base URL for deployed frontend, if needed
Database

MoveUp uses MongoDB Atlas as the cloud database and Mongoose for schema modeling.

Main collections include:

users
movementlogs
additional app data as needed for reminder/account features

Movement logs are connected to users so the app can calculate points, streaks, leaderboard rankings, and statistics.

Group Members
Osayi Uwadiae
Ted J. Burgess
Mhd Osama Alsaheb
Ralph Tolentino Ariza
Deployment Notes

The frontend is deployed on Netlify.

The deployed frontend should use a backend API URL from environment configuration, not hardcoded localhost.

The backend deployment URL still needs to be added once confirmed by the team.


---

# 3. Test quickly

This is docs-only, so no need to run the whole app unless you want.

Run:

```bash
git diff README.md
````
