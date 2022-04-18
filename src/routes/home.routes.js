const { Router } = require('express');
const { renderHomePage } = require('../controllers/home');
const { isLogin } = require('../middleware/');

const router = Router();

router.get('/', isLogin, renderHomePage);

module.exports = router;
