const express = require('express');
const router = express.Router();
const BloodBank = require('../models/BloodBank');

// Routes for the blood bank management functionality
router.get('/', async (req, res) => {
  try {
    const bloodBanks = await BloodBank.find();
    res.render('bloodbanks', { bloodBanks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);
    if (!bloodBank) {
      return res.status(404).send('Blood Bank not found');
    }
    res.render('bloodbank', { bloodBank });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { adminname, username, password, bloodbankname } = req.body;
    const bloodBank = new BloodBank({ adminname, username, password, bloodbankname });
    await bloodBank.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!bloodBank) {
      return res.status(404).send('Blood Bank not found');
    }
    res.send(bloodBank);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const bloodBank = await BloodBank.findByIdAndDelete(req.params.id);
    if (!bloodBank) {
      return res.status(404).send('Blood Bank not found');
    }
    res.send(bloodBank);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
