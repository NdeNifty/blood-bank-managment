const express = require('express');
const router = express.Router();
const BloodBank = require('../models/BloodBank');

router.post('/', async (req, res) => {
    try {
      const { adminname, username, password, bloodbankname } = req.body;
      const bloodBank = new BloodBank({ adminname, username, password, bloodbankname });
      await bloodBank.save();
      res.status(201).json({ message: 'Blood bank created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;