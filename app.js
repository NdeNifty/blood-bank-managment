const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bloodBankRoutes = require('./routes/bloodBankRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const signupRoutes = require('./routes/signupRoutes');
app.use('/signup', signupRoutes);

// Add the signup route
app.post('/signup', (req, res) => {
  // Handle the signup request here
});

app.use('/bloodbank', bloodBankRoutes);

// Set up the public folder
app.use(express.static(__dirname + '/public'));

// Set up the views folder
app.use('/views', express.static(__dirname + '/views'));

mongoose.connect('mongodb://127.0.0.1:27017/blood-bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
