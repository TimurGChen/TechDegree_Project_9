const express = require('express');
const router = express.Router();
const {Sequelize, sequelize, models} = require('../models');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

// helper function that catches errors of async functions
const asyncHandler = cb => {
    return async (req, res, next) => {
        try{
            await cb(req, res, next);
        } catch(err) {
            if (err.name === "SequelizeValidationError") {
                res.status = 400;
            }
            next(err);
        }
    }
}

// middleware to authenticate users
const authenticateUser = asyncHandler( async (req, res, next) => {
    let message = null;

    // parse user credentials from authorization header
    const credentials = auth(req);

    if (credentials) {
        const users = await models.User.findAll();
        // attempts to retrieve the user with matching email from the database
        const userMatch = users.find(user => user.emailAddress === credentials.name);
        if (userMatch) {
            // use bcryptjs to verify password match
            const authenticated = bcryptjs
                .compareSync(credentials.pass, userMatch.password);
            if (authenticated) {
                console.log(`Authentication successful for user with email: ${userMatch.emailAddress}`);
                req.currentUser = userMatch;
            } else {
                message = `Authentication successful for user with email: ${userMatch.emailAddress}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = `Auth header not found`;
    }

    // deny access if verification failed
    if (message) {
        console.log(message);
        res.status(401).json({"Message": "Access Denied!"})
    } else {
        next();
    }
});

// get the information for the authenticated user
router.get('/', authenticateUser, asyncHandler( async (req, res) => {
    res.status(200).json(req.currentUser);
  }));
  
// create a new user
router.post('/', asyncHandler( async (req, res) => {
    const user = req.body;
    // hash the password
    user.password = bcryptjs.hashSync(user.password);
    const newUser = await models.User.create(user);
    res.status(201).json(newUser);
}));




module.exports = router;