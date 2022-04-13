const { Router } = require('express');
const { body } = require('express-validator');
const { validateFields } = require('../helpers/validateFields');
const { getAllTasks, createTask } = require('../controllers/tasks');

const router = Router();

router.get('/', getAllTasks);

router.post(
  '/',
  [
    body('title', 'title is required and have be a string').isString(),
    body('title', 'title is required and have be a string').not().isEmpty(),
    body('description', 'title is required and have be a string').isString(),
    validateFields,
  ],
  createTask
);

module.exports = router;
