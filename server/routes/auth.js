const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '7d';

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // Check if email already exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      if (row) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      // Hash password
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.run(
          'INSERT INTO users (email, password_hash) VALUES (?, ?)',
          [email, hashedPassword],
          function(err) {
            if (err) {
              return res.status(500).json({ success: false, message: 'Error creating user' });
            }

            // Generate JWT token
            const token = jwt.sign(
              { userId: this.lastID, email },
              JWT_SECRET,
              { expiresIn: JWT_EXPIRY }
            );

            res.json({
              success: true,
              message: 'User registered successfully',
              token,
              user: { id: this.lastID, email }
            });
          }
        );
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error hashing password' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Check if user exists
    db.get('SELECT id, email, password_hash FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      // Compare passwords
      try {
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRY }
        );

        res.json({
          success: true,
          message: 'Login successful',
          token,
          user: { id: user.id, email: user.email }
        });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error comparing passwords' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Verify Token
router.post('/verify-token', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;
