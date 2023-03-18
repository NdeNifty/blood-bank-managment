const BloodBank = require('../models/BloodBank');

// Controller function to display the blood bank management page
const bloodBankManagementPage = async (req, res) => {
  try {
    const bloodBank = await BloodBank.findById(req.params.id);

    if (!bloodBank) {
      return res.status(404).json({ message: 'Blood bank not found' });
    }

    return res.status(200).render('bloodBankManagement', { bloodBank });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching the blood bank' });
  }
};

module.exports = {
  bloodBankManagementPage,
};
