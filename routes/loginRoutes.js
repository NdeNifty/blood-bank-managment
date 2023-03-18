const express = require('express');
const router = express.Router();
const BloodBank = require('../models/BloodBank');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const bloodBank = await BloodBank.findOne({ username });

    if (!bloodBank) {
      return res.status(400).send('Invalid Credentials');
    }

    if (password !== bloodBank.password) {
      return res.status(400).send('Invalid Credentials');
    }

    res.send('Logged in successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
