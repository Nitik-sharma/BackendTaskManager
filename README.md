# Task Management API

A RESTful Task Management API built using **Node.js, Express.js, MongoDB Atlas, and Mongoose**. This API allows users to register, login, and manage their personal tasks securely using JWT authentication.

---

## Features

* User Registration
* User Login (JWT Authentication)
* Create Task
* Get All Tasks (User specific)
* Update Task
* Delete Task
* Protected Routes
* MongoDB Atlas Integration
* Clean MVC Structure

---

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* dotenv

---

## Project Structure

```
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── .env
├── server.js
└── package.json
```

---

## Installation

### 1. Clone the repository

```
git clone https://github.com/Nitik-sharma/BackendTaskManager.git
```

```
cd task-management-api/backend
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in root folder:

```
PORT=5000

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/taskmanager?retryWrites=true&w=majority

JWT_SECRET=your_jwt_secret_key
```

---

### 4. Run the server

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

---

### Task Routes (Protected)

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/tasks     | Get all tasks |
| POST   | /api/tasks     | Create task   |
| PUT    | /api/tasks/:id | Update task   |
| DELETE | /api/tasks/:id | Delete task   |

---

## Example Request

### Register User

```
POST /api/auth/register
```

Body:

```
{
  "name": "Nitik",
  "email": "nitik@gmail.com",
  "password": "123456"
}
```

---

### Login User

```
POST /api/auth/login
```

Body:

```
{
  "email": "nitik@gmail.com",
  "password": "123456"
}
```

---

## Authentication

This API uses JWT Authentication.

Add token in header:

```
Authorization: Bearer your_token
```

---

## Database

This project uses MongoDB Atlas Cloud Database.

Connection handled via:

```
mongoose.connect(process.env.MONGO_URI)
```

---

## Scripts

```
npm run dev   # Run with nodemon
npm start     # Run normally
```

---

## Dependencies

```
express
mongoose
jsonwebtoken
bcryptjs
dotenv
nodemon
cors
```

---

## Author

Nitik Sharma

---


