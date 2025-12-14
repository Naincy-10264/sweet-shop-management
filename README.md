## Sweet Shop Management System

This is a full-stack Sweet Shop Management System that allows users to browse, search, and purchase sweets, while admin users can manage inventory, add new sweets, update prices, restock items, and delete products.

The application is built using Node.js, Express, MongoDB for the backend, and React with Vite for the frontend. Authentication and authorization are implemented using JWT.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Jest & Supertest (TDD)

### Frontend
- React (Vite)
- Axios
- React Router DOM
- CSS

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
npm test
npm start


### Create `.env` file 
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

### open in browser
http://localhost:5173

### Frontend Setup
cd frontend
npm install
npm run dev

## Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Register Page
![Register Page](screenshots/register.png)

### Dashboard (Available Sweets)
![Dashboard](screenshots/dashboard.png)

### Search & Filter
![Search](screenshots/search.png)

### Admin Panel
![Admin Panel](screenshots/admin.png)

## Test Report

The backend APIs were developed using Test-Driven Development (TDD).
All test cases were executed using Jest and Supertest and passed successfully.

![Test Report](screenshots/test-report.png)

## API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Sweets (Protected)
- POST `/api/sweets` (Admin)
- GET `/api/sweets`
- GET `/api/sweets/search`
- PUT `/api/sweets/:id` (Admin)
- DELETE `/api/sweets/:id` (Admin)

### Inventory
- POST `/api/sweets/:id/purchase`
- POST `/api/sweets/:id/restock` (Admin)

## My AI Usage

### AI Tools Used
- ChatGPT
- GitHub Copilot

### How I Used AI
- Used ChatGPT to understand and apply Test-Driven Development (TDD) for backend APIs.
- Used ChatGPT to generate initial boilerplate code for controllers, services, routes, and test cases.
- Used ChatGPT to debug issues related to JWT authentication, role-based authorization, and CORS.
- Used ChatGPT to structure frontend components, API service integration, and routing logic.
- Used ChatGPT to improve code quality, folder structure, and best practices.
- Used GitHub Copilot for inline code suggestions.

### Reflection
AI significantly improved my development workflow by speeding up debugging, clarifying complex concepts like JWT-based role authorization, and guiding me through TDD practices. However, I carefully reviewed all suggestions, manually implemented logic, and ensured correctness. AI acted as a productivity and learning assistant rather than a replacement for problem-solving.


