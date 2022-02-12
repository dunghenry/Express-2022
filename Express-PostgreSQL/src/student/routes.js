const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getStudents);
router.post('/', controller.addStudent);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.removeStudent);

module.exports = router;