let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    author: String,
    surveyTitle: String,
    description: String,
    questions: {type: Array}
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);