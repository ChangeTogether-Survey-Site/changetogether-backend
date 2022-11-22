let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');


module.exports.displaySurveyList = (req, res, next) => {
    Survey.find().then(documents => {
    console.log(documents);
    // response block
    res.status(200).json({
      message: "Posts fetched successfully!",
      surveys: documents
    });
  });
}

// module.exports.displayAddPage = (req, res, next) => {
//     res.json('survey/add', {title: 'Add Survey', 
//     displayName: req.user ? req.user.displayName : ''})          
// }

module.exports.createSurvey = (req, res, next) => {
    const survey = new Survey({
        surveyName: req.body.surveyName,
        organization: req.body.organization,
        description: req.body.description,
        questions: req.body.questions
      });
      // saves data to db
      survey.save().then( result => {
        console.log(`post data: ${result._id}`);
        res.status(201).json({
            message: "Survey added successfully",
            surveyId: result._id
          });
      });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.json('survey/edit', {title: 'Edit Survey', survey: surveyToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "surveyName": req.body.surveyName,
        "description": req.body.description,
        "organization": req.body.organization,
        "questions": req.body.questions
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    Survey.deleteOne({ _id: req.params.id }).then(result => {
        console.log(`delete: ${result}`);
        res.status(200).json({ message: "Survey deleted!" });
      });
}