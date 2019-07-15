let express = require('express');
let router = express.Router();
let checkJWT = require('../middlewares/checkJWT');

router.use('/api', require('../api/index'));

router.get('/',function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
