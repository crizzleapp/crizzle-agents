var express = require('express');
var router = express.Router();


router.use('/v1', require('./v1'));

router.get('/', function (req, res, next) {
    res.send('Crizzle API Root');
});

module.exports = router;