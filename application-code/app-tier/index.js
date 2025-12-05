// application-code/app-tier/index.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const dbConfig = require('./DbConfig');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection on startup
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('App Tier Health Check - OK');
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Password validation
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    console.log(`✅ New user created: ${email}`);

    res.status(201).json({ 
      message: 'User created successfully',
      userId: result.insertId 
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    res.status(500).json({ message: 'Server error during signup. Please try again.' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log(`✅ User logged in: ${email}`);

    // Return user data (without password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error during login. Please try again.' });
  }
});

// Get user profile endpoint
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [users] = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: users[0] });

  } catch (error) {
    console.error('❌ Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users endpoint (for testing/admin)
app.get('/users', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC'
    );

    res.status(200).json({ 
      count: users.length,
      users: users 
    });

  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 App tier server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});