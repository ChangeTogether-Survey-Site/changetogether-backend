let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveyController = require('../controllers/survey');

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
router.get('/', surveyController.displaySurveyList);

/* GET Route for displaying the Add page - CREATE Operation */
//router.get('/add', requireAuth, surveyController.displayAddPage);

/* POST Route for creating a new Survey object - CREATE Operation */
router.post('/', surveyController.createSurvey);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', surveyController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', surveyController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.delete('/:id', surveyController.performDelete);


module.exports = router;