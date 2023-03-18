const express = require('express');
const router = express.Router();
const BloodBank = require('../models/BloodBank');

router.post('/', async (req, res) => {
    const { adminname, username, password, bloodbankname } = req.body;

    try {
      // Check if the username already exists
      const existingBloodBank = await BloodBank.findOne({ username });
  
      if (existingBloodBank) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new blood bank object with the hashed password
      const bloodBank = new BloodBank({ adminname, username, password: hashedPassword, bloodbankname });
      await bloodBank.save();
  
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;