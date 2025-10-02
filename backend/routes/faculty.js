const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/dashboard/:facultyName', facultyController.getFacultyDashboard);
router.get('/list', facultyController.getFacultyList);

module.exports = router;
