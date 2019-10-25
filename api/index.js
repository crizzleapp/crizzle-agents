let express = require('express');
let router = express.Router();

router.use('/v1', require('./v1'));

router.get('/', function (req, res, next) {
    res.send('Crizzle API Root');
});

module.exports = router;
