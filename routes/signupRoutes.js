const express = require('express');
const router = express.Router();
const BloodBank = require('../models/BloodBank');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/', async (req, res) => {
    console.log(req.body);
  const { adminname, username, password, bloodbankname } = req.body;
  console.log(req.body);

  try {
    // Check if the username already exists
    const existingUser = await BloodBank.findOne({ username: { $regex: new RegExp(username, "i") } });


    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
