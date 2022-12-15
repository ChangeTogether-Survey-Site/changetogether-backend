let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    surveyName: String,
    description: String,
    organization: String,
    questions: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true }
});

module.exports = mongoose.model('Survey', surveyModel);