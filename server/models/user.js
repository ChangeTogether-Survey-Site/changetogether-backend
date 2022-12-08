const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let passportLocalMongoose = require('passport-local-mongoose');

let userModel = mongoose.Schema
(
    {
       email: 
       {
            type: String,
            trim: true,
            unique: true,
            required: true
       },
        password: 
        {
            type: String,
            trim: true,
            required: true
        }
    }
);

//userModel.plugin(uniqueValidator);

// configure options for User Model

module.exports.User = mongoose.model('User', userModel);