let createError = require('http-errors');
const mongoose = require('mongoose');
let cors = require('cors');
let express = require('express');
let path = require('path');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let helmet = require('helmet');
let data = require('./models/data');

let app = express();

// Common settings
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/index'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
