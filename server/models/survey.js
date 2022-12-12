let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    surveyName: String,
    description: String,
    organization: String,
    questions: String
// },
// {
//     collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);