let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.json('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {
    res.json('index', { title: 'Login', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayRegisterPage = (req, res, next) => {
    res.json('index', { title: 'Create a Survey', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.json('index', { title: 'About us', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.json('index', { title: 'Contact', displayName: req.user ? req.user.displayName : ''});
}

