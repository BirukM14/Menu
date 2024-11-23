const bcrypt = require('bcrypt');
const Product = require("../models/productModel");
const User = require("../models/User");
const express = require('express');

const api = express.Router();

//router.use('/orderRouter', orderRoutes);
api.get('/products',  async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

api.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already taken" });
        }

        const salt = await bcrypt.genSalt(10);  // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt);  // Hash password

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user',  // Default role or you can set it dynamically
            createdAt: new Date()  // Optionally add createdAt date
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

api.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;  // Get email and password from the request body
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = api;
