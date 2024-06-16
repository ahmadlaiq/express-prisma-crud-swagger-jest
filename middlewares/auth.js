// Import express
const express = require('express');

// Import jwt
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get token
    const token = req.headers['authorization'];
    // Check if token is not provided, then return 401
    if (!token) return res.status(401).json({ message: 'Unauthenticated.' });

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // If token is invalid, return 401
        if (err) return res.status(401).json({ message: 'Invalid token' });
        // Set userId in req
        req.userId = decoded.id;
        // Continue to next middleware
        next();
    });
};

module.exports = verifyToken;