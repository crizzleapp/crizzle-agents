let createError = require('http-errors');
const mongoose = require('mongoose');
let cors = require('cors');
let express = require('express');
let path = require('path');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let data = require('./models/data');

let apiRouter = require('./api/index');
let app = express();

// Common settings
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/api', apiRouter);

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
