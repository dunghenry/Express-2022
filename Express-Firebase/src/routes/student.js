const express = require('express');
const {addStudent, getAllStudents} = require('../controllers/studentController');

const router = express.Router();

router.post('/student', addStudent);
router.get('/students', getAllStudents);

module.exports = {routes: router}