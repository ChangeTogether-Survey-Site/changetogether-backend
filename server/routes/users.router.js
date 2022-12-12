const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

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
  // validate if email exists
  User.find({ email: req.body.email })
    .then(user=> {
      if (!user){
        // if user does not exist
        return res.status(401).json({"message": "Auth has failed"});
      } // end if
      // user exists, validation of pass
      bcrypt.compare(req.body.password, user.password);
    })
      .then(res => {
        if (!res){
          return res.status(401).json({"message": "Auth has failed"});
        }
        // correct pass comparison (JWT)
        const token = jwt.sign( { email: user.email, userId: user._id }, 'Chewbacca', { expiresIn: "1h" } );
      }).catch(err => {
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
