const mongoose = require('mongoose');

const BloodBankSchema = new mongoose.Schema({
  adminname: String,
  username: String,
  password: String,
  bloodbankname: String,
  bloodGroups: {
    A_POS: { type: Number, default: 0 },
    A_NEG: { type: Number, default: 0 },
    B_POS: { type: Number, default: 0 },
    B_NEG: { type: Number, default: 0 },
    O_POS: { type: Number, default: 0 },
    O_NEG: { type: Number, default: 0 },
    AB_POS: { type: Number, default: 0 },
    AB_NEG: { type: Number, default: 0 },
  },
});

const BloodBank = mongoose.model('BloodBank', BloodBankSchema);

module.exports = BloodBank;
