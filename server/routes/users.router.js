const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: "User created!!!",
        result: result
      });
    })
    .catch(err => {
        res.status(500).json({
          error: err
        });
    });
  });
});


router.post("/login", (req, res, next) => {
  let currentUser;
  // validate if email exists
  User.findOne({ email: req.body.email })
    .then(user=> {
      // console.log("user: " + user);
      if (!user){
        // if user does not exist
        return res.status(401).json({"message": "Auth has failed"});
      } // end if
      // user exists, validation of pass
      currentUser = user; // saves fecthed user to pass it down to the next then
      return bcrypt.compare(req.body.password, user.password);;
    })
      .then(result => {
        //console.log("result: " + result.comparison + " currentUser: " + result.currentUser);
        if (!result){
          return res.status(401).json({"message": "Auth has failed"});
        }
        // correct pass comparison (JWT)
        const token = jwt.sign( { email: currentUser.email, userId: currentUser._id }, 'Chewbacca', { expiresIn: "1h" } );
        console.log("token: " + token);
        res.status(200).json({ 
          token: token
         });
      }).catch(err => {
        console.log("err: " + err);
        return res.status(401).json({"message": "Auth has failed"});
      })
});


/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.status(201).json({
    message: "signup GET",
  });
});




module.exports = router;
