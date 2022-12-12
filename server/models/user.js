const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//let passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
       email:{ type: String, required: true, unique: true },
        password: { type: String, required: true }
});


// configure options for User Model
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);