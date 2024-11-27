const express = require('express');
const { body, validationResult } = require('express-validator');
const authRouter = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Input validation middleware
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .withMessage('Password must contain at least one number, one lowercase and one uppercase letter'),
  body('role')
    .isIn(['admin', 'doctor', 'patient', 'pharmacist', 'lab_technician'])
    .withMessage('Invalid role specified')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Error handler middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id, 
      role: user.role,
      email: user.email 
    },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

// Register endpoint
authRouter.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          status: 'error',
          message: 'Email is already registered' 
        });
      }

      // Create new user
      const user = new User({ 
        name, 
        email, 
        password, 
        role,
        isActive: true
      });
      
      await user.save();

      // Generate token
      const token = generateToken(user);

      // Return success response
      res.status(201).json({
        status: 'success',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error creating user account',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// Login endpoint
authRouter.post(
  '/login',
  loginValidation,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user and check if active
      const user = await User.findOne({ email });
      if (!user || !user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        });
      }

      // Generate token
      const token = generateToken(user);

      // Return success response
      res.json({
        status: 'success',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Error during login',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

module.exports = { authRouter };