let express = require('express');
let router = express.Router();
let checkJWT = require('../middlewares/checkJWT');

// TODO: Error pages https://github.com/expressjs/express/tree/master/examples/error-pages

router.use('/api/v1', require('./apiv1'));
router.use('/api', require('./apiv1'));

router.get('/',function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
