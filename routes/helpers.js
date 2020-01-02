const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { models } = require('../models');

const asyncHandler = cb => {
    return async (req, res, next) => {
        try{
            await cb(req, res, next);
        } catch(err) {
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                const errorMessages = err.errors.map(error => error.message);
                res.status(400).json({"errors": errorMessages});
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

module.exports = {
    asyncHandler,
    authenticateUser
};