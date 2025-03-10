import express from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import bcrypt from 'bcryptjs';


const router = express.Router();

//* Register route
router.post('/register', async (req, res) => {

    const { username, email, password } = req.body;

    try {
        //* If user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' })
        };

        //* Creating new user
        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        //* Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(201).json({ message: 'User registered successfully.' })
    } catch (err) {
        res.status(500).json({ err: err.message });
    };

});

//* Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password.' });

        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        };

        if (!user.password) {
            return res.status(500).json({ err: 'User password is missing form the database' })
        };
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        };

        //* Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(200).json({ message: 'User logged in successfully.' });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ err: error.message })
    };


});


//* Logout route
router.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'User logged out successfully.' });
});



export default router