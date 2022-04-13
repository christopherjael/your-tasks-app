const { Router } = require('express');
const { body, param } = require('express-validator');
const { validateFields } = require('../helpers/validateFields');
const {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/tasks');

const router = Router();

router.get('/', getAllTasks);

router.post(
  '/create',
  [
    body('title', 'title is required and have be a string').isString(),
    body('title', 'title is required and have be a string').not().isEmpty(),
    body('description', 'title is required and have be a string').isString(),
    validateFields,
  ],
  createTask
);

router.get(
  '/delete/:id',
  [param('id', 'id is required').isMongoId(), validateFields],
  deleteTask
);

router.post(
  '/update/:id',
  [
    param('id', 'id is required').isMongoId(),
    body('title', 'title is required and have be a string').isString(),
    body('title', 'title is required and have be a string').not().isEmpty(),
    body('description', 'title is required and have be a string').isString(),
    validateFields,
  ],
  updateTask
);

module.exports = router;
