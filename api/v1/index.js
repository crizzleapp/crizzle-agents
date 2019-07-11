var express = require('express');
var router = express.Router();

// API v1.0 root.
router.get('/', function (req, res, next) {
    res.send('Crizzle API v1.0');
});

module.exports = router;
