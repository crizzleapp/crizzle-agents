let express = require('express');
let router = express.Router();
let checkJWT = require('../middlewares/checkJWT');
const questionController = require('../controllers/question');

router.get('/', questionController.listQuestions);
router.get('/:id', questionController.getQuestion);
router.post('/', questionController.createQuestion);
router.post('/:id/answer', questionController.answerQuestion);

module.exports = router;
