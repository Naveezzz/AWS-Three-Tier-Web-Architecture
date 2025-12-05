# App-Tier (Backend API)

Node.js Express backend API for user authentication with MySQL database.

## Features

- User signup with password hashing (bcrypt)
- User login with authentication
- RESTful API endpoints
- MySQL database integration
- Health check endpoint
- Error handling and validation

## Technologies

- Node.js 16.x
- Express.js 4.18.2
- MySQL2 3.6.0
- bcrypt 5.1.1
- CORS enabled
- PM2 process manager

## API Endpoints

### Health Check
```
GET /health
Response: "App Tier Health Check - OK"
```

### Signup
```
POST /signup
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```
POST /login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User
```
GET /user/:id
```

### Get All Users
```
GET /users
```

## Setup

1. Update `DbConfig.js` with your RDS credentials
2. Install dependencies: `npm install`
3. Start server: `npm start` or with PM2: `pm2 start index.js`

## Environment

- Port: 4000
- Database: MySQL (RDS)
- Process Manager: PM2

## Security

- Passwords hashed with bcrypt (10 rounds)
- Email validation
- SQL injection protection with parameterized queries
- CORS enabled for frontend communication