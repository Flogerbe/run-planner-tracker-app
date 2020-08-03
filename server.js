// Require modules
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const port = 3000;
const indexRouter = require('./routes/index');

// Load the env vars
require('dotenv').config()

// Set up express app
const app = express();

// Connect to DB
require('./config/database');
require('./config/passport');

// Configure the app with app.set()
app.set('view engine', 'ejs');

// Mount middleware with app.use()
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'Born2Run!',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Mount routes with app.use()
app.use('/', indexRouter);

// Tell App to listen
app.listen(port, function() {
    console.log(`Express is listening on port:${port}`);
});