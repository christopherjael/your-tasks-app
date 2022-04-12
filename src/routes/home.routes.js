const { Router } = require('express');
const { renderHomePage } = require('../controllers/home');

const router = Router();

router.get('/', renderHomePage);

module.exports = router;
