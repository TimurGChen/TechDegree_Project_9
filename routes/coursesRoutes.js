const express = require('express');
const router = express.Router();
const {Sequelize, sequelize, models} = require('../models');

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

//courses routes
router.get('/', asyncHandler( async(req, res) => {
    const allCourses = await models.Course.findAll();
    res.status(200).json(allCourses);
}));
  
router.get('/:id', asyncHandler( async (req, res) => {
    const course = await models.Course.findByPk(req.params.id);
    res.status(200).json(course);
}));

router.post('/', asyncHandler( async (req, res) => {
    await models.Course.create(req.body);
    res.status(201).end();
}));

router.put('/:id', (req, res) => {
    const id = req.params.id;
    res.status(204).end();
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.status(204).end();
})

module.exports = router;