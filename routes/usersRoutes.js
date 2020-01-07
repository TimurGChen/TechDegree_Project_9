const express = require('express');
const router = express.Router();
const { models } = require('../models');
const { User } = models;
const { asyncHandler, authenticateUser } = require('./helpers');
const bcryptjs = require('bcryptjs');

// get the information for the authenticated user
router.get('/', authenticateUser, asyncHandler( async (req, res) => {
    const user = await User.findByPk(req.currentUser.id, {
        attributes: ['id', 'firstName', 'lastName', 'emailAddress']
    });
    res.status(200).json(user);
  }));
  
// create a new user
router.post('/', asyncHandler( async (req, res) => {
    const user = req.body;
    // hash the password
    if (user.password) {
        user.password = bcryptjs.hashSync(user.password);
    }
    await User.create(user);
    res.status(201).location('/').end();
}));

module.exports = router;