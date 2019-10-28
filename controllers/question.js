const Question = require('../models/question');

exports.listQuestions = function (req, res, next) {
    Question.find({}, (err, questions) => {
        const questionMap = questions.map(question => ({
            id: question.id,
            title: question.title,
            description: question.description,
            answers: question.answers,
        }));
        res.send(questionMap);
    });
};

exports.getQuestion = function (req, res, next) {
    Question.findById(req.params.id, (err, question) => {
        if (err) return next(err);
        if (question === null) {
            res.status(404).send();
        } else {
            res.send(question);
        }
    });
};

exports.createQuestion = function (req, res, next) {
    const {title, description} = req.body;
    if (title === null || description === null) res.status(400).send();
    // TODO: Ensure author name exists
    let question = new Question({
        title,
        description,
        answers: [],
        // author: req.user.name,
    });

    question.save(err => {
        if (err) return next(err);
        res.send({id: question.id});
    });
};

exports.answerQuestion = function (req, res, next) {
    const {answer} = req.body;
    Question.findByIdAndUpdate(
        req.params.id,
        {$push: {answers: answer}},
        (err, question) => {
            if (err) return next(err);
            if (question === null) {
                res.status(404).send();
            } else {
                res.send({id: question._id});
            }
        }
    );
};
