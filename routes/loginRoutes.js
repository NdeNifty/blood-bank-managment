const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BloodBank = require('../models/BloodBank');

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle the login request
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the blood bank in the database
    const bloodBank = await BloodBank.findOne({ username });
    if (!bloodBank) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Compare the password provided with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, bloodBank.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Generate a JWT token for the authenticated blood bank
    const token = jwt.sign({ id: bloodBank._id }, 'secret');
    // Set the JWT token as a cookie in the response
    res.cookie('jwt', token, { httpOnly: true });
    // Redirect to the blood bank management page
    res.redirect('/bloodbank/management');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
