# Web Tier

# Web-Tier (Frontend)

React-based frontend application for user authentication and profile management.

## Features

- User login interface
- User signup/registration
- User dashboard with profile information
- Responsive design with gradient background
- Form validation
- Error handling
- Loading states

## Technologies

- React 18.2.0
- Create React App
- CSS3 (custom styling)
- Fetch API for backend communication

## Components

### App.jsx
Main component that manages routing between Login, Signup, and Dashboard views.

### Login.jsx
User login form with email and password validation.

### Signup.jsx
User registration form with password confirmation and validation.

### Dashboard.jsx
User profile dashboard displaying account information.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

The build folder will contain optimized production files that Nginx will serve.

## API Integration

Frontend communicates with backend via `/api/` endpoints:
- `/api/signup` - User registration
- `/api/login` - User authentication

Nginx proxies these requests to the internal load balancer (app-tier).

## Deployment

The production build is served by Nginx web server. See `nginx.conf` for configuration.

## Styling

Custom CSS with:
- Gradient purple background
- White card-based forms
- Responsive design
- Smooth transitions
- Modern UI elements