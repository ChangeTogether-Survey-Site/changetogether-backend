let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

// test
router.get('/testme', (req, res, next) => {
    
    res.json('list', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
});

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/login', indexController.displayLoginPage);

/* GET Services page. */
router.get('/register', indexController.displayRegisterPage);

/* GET Contact Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Route for displaying the Login page */
router.get('/contact', indexController.displayContactPage);

module.exports = router;
