// routes/auth.js
const express = require('express');
const authRouter = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

authRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} );

module.exports = {authRouter}

