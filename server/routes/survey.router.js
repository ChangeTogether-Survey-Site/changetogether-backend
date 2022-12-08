let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveyController = require('../controllers/survey.controller');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    // if(!req.isAuthenticated())
    // {
    //     return res.redirect('/login');
    // }
    console.log("authenticated");
    next();
}

// API CALLS

/* GET Route for the Surveys List - READ Operation */
router.get('/surveys', surveyController.displaySurveyList);

/* POST Route for creating a new Survey object - CREATE Operation */
router.post('/surveys', surveyController.createSurvey);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', surveyController.displayEditPage);

/* PUT Route for updating a survey - UPDATE Operation */
router.put('/surveys/:id', surveyController.updateSurvey);

/* DELETE to perform  Deletion - DELETE Operation */
router.delete('/surveys/:id', surveyController.performDelete);


module.exports = router;