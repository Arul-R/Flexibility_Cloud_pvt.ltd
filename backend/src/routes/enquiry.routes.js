// server/src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiry.controller');

// Create a new User
router.post('/', enquiryController.create);

// Retrieve all Users
router.get('/', enquiryController.findAll);

// Retrieve a single User with id
router.get('/:id', enquiryController.findOne);

module.exports = router;