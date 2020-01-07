const express = require('express');
const router = express.Router();
const { models } = require('../models');
const { Course } = models;
const { asyncHandler, authenticateUser } = require('./helpers');

// GET all courses
router.get('/', asyncHandler( async(req, res) => {
    const allCourses = await Course.findAll({
        attributes: ['id', 'userId', 'title', 'description', 'estimatedTime', 'materialsNeeded']
    });
    res.status(200).json(allCourses);
}));

// GET the course with id
router.get('/:id', asyncHandler( async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: ['id', 'userId', 'title', 'description', 'estimatedTime', 'materialsNeeded']
    });
    res.status(200).json(course);
}));

// POST (create) a new course
router.post('/', authenticateUser, asyncHandler( async (req, res) => {
    const newCourse = await Course.create(req.body);
    const courseId = newCourse.id;
    res.status(201).location(`/api/courses/${courseId}`).end();
}));

// PUT (update) the course with id
router.put('/:id', authenticateUser, asyncHandler( async (req, res) => {
    const id = req.params.id;
    const course = await Course.findByPk(id);
    if (course) {
        if (course.userId === req.currentUser.id) {
            if (req.body && req.body.title && req.body.description) {
                await course.update(req.body);
                res.status(204).end();
            } else {
                res.status(400).json({"Message": "Please provide values for \"title\" and \"description\""});
            }
        } else {
            res.status(403).json({ "Message": "The user do not have access to the course" });
        }
    } else {
        throw new Error(`The course with id: ${id} does not exist!`);
    }
}));

// DELETE the course with id
router.delete('/:id', authenticateUser, asyncHandler( async (req, res) => {
    const id = req.params.id;
    const course = await Course.findByPk(id);
    if (course) {
        if (course.userId === req.currentUser.id) {
            await course.destroy();
            res.status(204).end();
        } else {
            res.status(403).json({ "Message": "The user do not have access to the course" });
        }
    } else {
        throw new Error(`The course with id: ${id} does not exist!`);
    }
}));

module.exports = router;