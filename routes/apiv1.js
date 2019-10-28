let express = require('express');
let router = express.Router();

router.use('/questions', require('./question'));

router.get('/', function (req, res, next) {
    res.send('Crizzle API v1.0');
});

module.exports = router;
