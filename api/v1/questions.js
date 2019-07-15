let express = require('express');
let router = express.Router();
let checkJWT = require('../../middlewares/checkJWT');

// Dummy database containing questions
let questions = [
    {id: 1, title: "What time is it?", description: "", answers: []},
];

// Get all questions
router.get('/', (req, res, next) => {
    const qs = questions.map(q => ({
        id: q.id,
        title: q.title,
        description: q.description,
        answers: q.answers.length,
    }));
    res.send(qs);
});

// Get specific question
router.get('/:id', (req, res, next) => {
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
    res.send(question[0]);
});

// Post a new question
router.post('/', checkJWT, (req, res, next) => {
    const {title, description} = req.body;
    if (title === null || description === null) res.status(400).send();
    const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
        author: req.user.name,
    };
    questions.push(newQuestion);
    res.status(200).send();
});

// Answer a question
router.post('/:id/answer', checkJWT, (req, res, next) => {
    const {answer} = req.body;
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
    question[0].answers.push({answer, author: req.user.name});
    res.status(200).send();
});

module.exports = router;
