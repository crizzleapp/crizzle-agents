// Create App
let express = require('express');
let app = express();

// Common Plugins
let createError = require('http-errors');
let cors = require('cors');
let path = require('path');
const bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
let helmet = require('helmet');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

// Connect to Database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoBD Connection Error:'));
mongoose.set('useFindAndModify', false);

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/index'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    let error = createError(404);
    next(error);
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
