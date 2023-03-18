const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const jwt = require('jsonwebtoken');
const bloodBankRoutes = require('./routes/bloodBankRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up session middleware
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Set up JWT middleware
app.use((req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, 'my-secret-key');
      req.user = decoded;
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

app.use('/bloodbank', bloodBankRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);

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
