const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    answers: {type: [String]},
    author: {type: String},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Question', QuestionSchema);
