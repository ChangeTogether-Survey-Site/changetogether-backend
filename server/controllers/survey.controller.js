let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require("jsonwebtoken");

// create a reference to the model
let Survey = require("../models/survey");

module.exports.displaySurveyList = (req, res, next) => {
  Survey.find().then((documents) => {
    console.log(documents);
    // response block
    res.status(200).json({
      message: "Posts fetched successfully!",
      surveys: documents,
    });
  });
};

module.exports.getSurveyById = (req, res, next) => {
  Survey.findById(req.params.id).then((s) => {
    if (s) {
      res.status(200).json(s);
    } else {
      res.status(404).json({ message: "Survey not found!" });
    }
  });
};

module.exports.createSurvey = (req, res, next) => {
  const survey = new Survey({
    surveyName: req.body.surveyName,
    organization: req.body.organization,
    description: req.body.description,
    questions: req.body.questions,
    creator: req.userData.userId,
  });

  // saves data to db
  survey.save();
  res.status(201).json({
    message: "Survey added successfully",
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Survey.findById(id, (err, surveyToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.json("survey/edit", {
        title: "Edit Survey",
        survey: surveyToEdit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.updateSurvey = (req, res, next) => {
  const survey = new Survey({
    _id: req.body.id,
    surveyName: req.body.surveyName,
    description: req.body.description,
    organization: req.body.organization,
    questions: req.body.questions,
  });

  Survey.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    survey
  ).then((result) => {
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Update was successful!" });
    } else {
      res.status(401).json({ message: "User not authorized to update!" });
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  Survey.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Survey deleted!" });
      } else {
        res.status(401).json({ message: "User not authorized to delete!" });
      }
    }
  );
};
