const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    answers: [{author: {type: Object, required: true}, answer: {type: String, required: true}}],
    author: {type: String, required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Question', QuestionSchema);
