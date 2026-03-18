const express = require('express');
const User = require('../models/user'); 
const router = express.Router();

// 1. Designer Registration Route
router.post('/register', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ name, username, password });
        await newUser.save(); 
        
        res.status(201).json({ message: 'Designer registered successfully!' });
    } catch (error) {
        console.error("Registration Error: ", error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// 2. Designer Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        
        const user = await User.findOne({ username });
        
        
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        res.status(200).json({ 
            message: 'Login successful!', 
            userId: user._id, 
            name: user.name,
            role: 'designer'
        });
    } catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// 3. Get User Profile Details
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        
        res.status(200).json({ name: user.name, username: user.username });
    } catch (error) {
        console.error("Profile Fetch Error: ", error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// 4. Update User Profile
router.put('/profile/:id', async (req, res) => {
    try {
        const { name, password } = req.body;
        
        const updateData = { name };
        //
        if (password && password.trim() !== '') {
            updateData.password = password;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: updateData }, 
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: 'Profile updated successfully!', name: updatedUser.name });
    } catch (error) {
        console.error("Profile Update Error: ", error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

module.exports = router;